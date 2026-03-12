"use client";

import { useParams } from "next/navigation";
import { UserDetails } from "./UserDetails";

export default function UserDetailsPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : (params.id?.[0] ?? "");

  if (!id) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Invalid user id.</p>
      </div>
    );
  }

  return <UserDetails userId={id} />;
}
