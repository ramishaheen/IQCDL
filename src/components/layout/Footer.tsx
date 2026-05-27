"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useLocale } from "@/components/providers/LocaleProvider";

export function Footer() {
  const { t } = useLocale();

  const columns = [
    {
      title: t("footer.product"),
      links: [
        { href: "/programs", label: t("footer.links.program") },
        { href: "/programs#foundation", label: t("footer.links.foundation") },
        { href: "/programs#practitioner", label: t("footer.links.practitioner") },
        { href: "/assessment", label: t("footer.links.assessment") },
      ],
    },
    {
      title: t("footer.resources"),
      links: [
        { href: "/roadmap", label: t("footer.links.roadmap") },
        { href: "/standards", label: t("footer.links.standards") },
        { href: "/verify", label: t("footer.links.verify") },
        { href: "/login", label: t("footer.links.portal") },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { href: "#", label: t("footer.links.privacy") },
        { href: "#", label: t("footer.links.terms") },
        { href: "mailto:info@iqcdl.org", label: t("footer.links.contact") },
      ],
    },
  ];

  return (
    <footer className="relative mt-10 border-t border-slate-200 bg-white">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Logo variant="full" />
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              {t("footer.tagline")}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              info@iqcdl.org · www.iqcdl.org
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-slate-900">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-500 transition hover:text-quantum-cyan"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-xs leading-relaxed text-slate-500">
            {t("footer.disclaimer")}
          </p>
          <p className="mt-3 text-xs text-slate-500">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
}
