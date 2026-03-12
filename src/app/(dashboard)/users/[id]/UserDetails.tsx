"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getUserById } from "@/lib/api/users";
import { saveUserOverrides, getUserOverrides } from "@/lib/persistence/userOverrides";
import {
  userDetailsSchema,
  formDataToOverrides,
  type UserDetailsFormData,
} from "@/lib/validations/user";
import type { AppUser } from "@/types/user";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import styles from "./page.module.scss";

type SaveStatus = "idle" | "saving" | "success" | "error";

interface UserDetailsProps {
  userId: string;
}

async function loadUserData(userId: string): Promise<{
  merged: AppUser | null;
  loadError: string | null;
  formDefaults: UserDetailsFormData;
}> {
  try {
    const [apiUser, overrides] = await Promise.all([getUserById(userId), getUserOverrides(userId)]);
    const mergedUser: AppUser = { ...apiUser, ...overrides };
    const genderLower = mergedUser.gender?.toLowerCase();
    const validGender =
      genderLower === "male" || genderLower === "female" ? genderLower : undefined;
    const maritalLower = mergedUser.maritalStatus?.toLowerCase();
    const maritalMap: Record<string, "single" | "married" | "divorced" | "widowed"> = {
      single: "single",
      married: "married",
      divorced: "divorced",
      widowed: "widowed",
    };
    const validMaritalStatus =
      maritalLower && maritalMap[maritalLower] ? maritalMap[maritalLower] : undefined;

    return {
      merged: mergedUser,
      loadError: null,
      formDefaults: {
        fullName: mergedUser.fullName,
        email: mergedUser.email,
        phoneNumber: mergedUser.phoneNumber,
        status: mergedUser.status,
        organization: mergedUser.organization ?? "",
        bvn: mergedUser.bvn ?? "",
        gender: validGender,
        maritalStatus: validMaritalStatus,
      },
    };
  } catch (err) {
    return {
      merged: null,
      loadError: err instanceof Error ? err.message : "Failed to load user",
      formDefaults: null as unknown as UserDetailsFormData,
    };
  }
}

export function UserDetails({ userId }: UserDetailsProps) {
  const [merged, setMerged] = useState<AppUser | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveMessage, setSaveMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserDetailsFormData>({
    resolver: zodResolver(userDetailsSchema),
  });

  useEffect(() => {
    let cancelled = false;
    loadUserData(userId).then((result) => {
      if (cancelled) return;
      if (result.loadError) {
        setLoadError(result.loadError);
        return;
      }
      setMerged(result.merged);
      reset(result.formDefaults);
    });
    return () => {
      cancelled = true;
    };
  }, [userId, reset]);

  const onSubmit = async (data: UserDetailsFormData) => {
    setSaveStatus("saving");
    setSaveMessage("");
    try {
      await saveUserOverrides(userId, formDataToOverrides(data));
      setSaveStatus("success");
      setSaveMessage("Changes saved. They will persist after reload.");
    } catch {
      setSaveStatus("error");
      setSaveMessage("Save failed. Changes were not persisted.");
    }
  };

  if (loadError) {
    return (
      <div className={styles.page}>
        <Link href="/users" className={styles.backLink}>
          Back to Users
        </Link>
        <div className={styles.errorBanner} role="alert">
          {loadError}
        </div>
      </div>
    );
  }

  if (!merged) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Loading user…</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Link href="/users" className={styles.backLink}>
        Back to Users
      </Link>

      <h1 className={styles.title}>User Details</h1>
      <p className={styles.subtitle}>
        View and edit user information. Edits are stored locally and persist after reload.
      </p>

      {saveStatus === "success" && (
        <div className={styles.successBanner} role="status">
          {saveMessage}
        </div>
      )}
      {saveStatus === "error" && (
        <div className={styles.errorBanner} role="alert">
          {saveMessage}
        </div>
      )}

      <Card padding="lg" className={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            <div className={styles.fieldGrid}>
              <Input label="Full name" {...register("fullName")} error={errors.fullName?.message} />
              <Input
                label="Email"
                type="email"
                {...register("email")}
                error={errors.email?.message}
              />
              <Input
                label="Phone number"
                {...register("phoneNumber")}
                error={errors.phoneNumber?.message}
              />
              <div className={styles.inputGroup}>
                <label htmlFor="status" className={styles.label}>
                  Status
                </label>
                <select id="status" className={styles.select} {...register("status")}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="blacklisted">Blacklisted</option>
                </select>
              </div>
              <Input label="Organization" {...register("organization")} />
              <Input label="BVN" {...register("bvn")} />
              <div className={styles.inputGroup}>
                <label htmlFor="gender" className={styles.label}>
                  Gender
                </label>
                <select id="gender" className={styles.select} {...register("gender")}>
                  <option value="">—</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="maritalStatus" className={styles.label}>
                  Marital status
                </label>
                <select id="maritalStatus" className={styles.select} {...register("maritalStatus")}>
                  <option value="">—</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>
          </section>

          <div className={styles.actions}>
            <Button type="submit" variant="primary" size="lg" loading={saveStatus === "saving"}>
              Save changes
            </Button>
          </div>
        </form>
      </Card>

      <p className={styles.hint}>Created: {new Date(merged.createdAt).toLocaleString()}</p>
    </div>
  );
}
