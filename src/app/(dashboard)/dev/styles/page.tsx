"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import styles from "./page.module.scss";

const colors = [
  { name: "Primary", var: "#39CDCC" },
  { name: "Primary Dark", var: "#213F7D" },
  { name: "Success", var: "#39CD62" },
  { name: "Warning", var: "#E9B200" },
  { name: "Error", var: "#E4033B" },
  { name: "Inactive", var: "#545F7D" },
  { name: "Background", var: "#FFFFFF" },
  { name: "Background Light", var: "#FBFBFB" },
];

const typographyScale = [
  { name: "xs (12px)", size: "0.75rem" },
  { name: "sm (14px)", size: "0.875rem" },
  { name: "base (16px)", size: "1rem" },
  { name: "lg (18px)", size: "1.125rem" },
  { name: "xl (20px)", size: "1.25rem" },
  { name: "2xl (24px)", size: "1.5rem" },
  { name: "3xl (32px)", size: "2rem" },
  { name: "4xl (40px)", size: "2.5rem" },
];

const spacingScale = [
  { name: "xs", value: "4px" },
  { name: "sm", value: "8px" },
  { name: "md", value: "16px" },
  { name: "lg", value: "24px" },
  { name: "xl", value: "32px" },
  { name: "2xl", value: "48px" },
  { name: "3xl", value: "64px" },
];

export default function StylesPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Design System Explorer</h1>
      <p className={styles.pageDescription}>
        Visual reference for all design tokens and reusable components.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colors</h2>
        <div className={styles.colorGrid}>
          {colors.map((color) => (
            <div key={color.name} className={styles.colorCard}>
              <div className={styles.colorSwatch} style={{ background: color.var }} />
              <div className={styles.colorInfo}>
                <span className={styles.colorName}>{color.name}</span>
                <code className={styles.colorValue}>{color.var}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography Scale</h2>
        <div className={styles.typeScale}>
          {typographyScale.map((t) => (
            <div key={t.name} className={styles.typeRow}>
              <code className={styles.typeMeta}>{t.name}</code>
              <span style={{ fontSize: t.size }}>The quick brown fox jumps over the lazy dog</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>
        <div className={styles.spacingScale}>
          {spacingScale.map((s) => (
            <div key={s.name} className={styles.spacingRow}>
              <code className={styles.spacingMeta}>
                {s.name} ({s.value})
              </code>
              <div className={styles.spacingBar} style={{ width: s.value }} />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons</h2>
        <div className={styles.componentRow}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
        <h3 className={styles.subsectionTitle}>Sizes</h3>
        <div className={styles.componentRow}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <h3 className={styles.subsectionTitle}>States</h3>
        <div className={styles.componentRow}>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button variant="outline" fullWidth>
            Full Width
          </Button>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Inputs</h2>
        <div className={styles.inputGrid}>
          <Input label="Email" placeholder="Enter email" />
          <Input label="Password" placeholder="Enter password" type="password" />
          <Input label="Error State" placeholder="Invalid input" error="This field is required" />
          <Input label="Disabled" placeholder="Cannot edit" disabled />
          <Input label="With Helper" placeholder="Type here" helperText="Helper text goes here" />
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cards</h2>
        <div className={styles.componentRow}>
          <Card padding="sm">
            <p>Small padding</p>
          </Card>
          <Card padding="md">
            <p>Medium padding</p>
          </Card>
          <Card padding="lg">
            <p>Large padding</p>
          </Card>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Avatars</h2>
        <div className={styles.componentRow}>
          <Avatar size="sm" fallback="A" alt="Small avatar" />
          <Avatar size="md" fallback="JS" alt="Medium avatar" />
          <Avatar size="lg" fallback="LQ" alt="Large avatar" />
        </div>
      </section>
    </div>
  );
}
