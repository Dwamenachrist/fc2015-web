"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { Person, Role } from "@/content/schema";
import { ChevronDown } from "@/components/ui/Icons";
import styles from "./Squad.module.css";

const GROUPS: { role: Role; filter: string; heading: string; tag: string }[] = [
  { role: "GK", filter: "Goalkeepers", heading: "Goalkeepers", tag: "Goalkeeper" },
  { role: "DF", filter: "Defenders", heading: "Defenders", tag: "Defender" },
  { role: "MF", filter: "Midfielders", heading: "Midfielders", tag: "Midfielder" },
  { role: "FW", filter: "Forwards", heading: "Forwards", tag: "Forward" },
  { role: "STAFF", filter: "Technical Staff", heading: "Technical staff", tag: "Staff" },
];

type Filter = "ALL" | Role;
const isFilter = (v: string | null): v is Filter => v === "ALL" || GROUPS.some((g) => g.role === v);

const URL_EVENT = "squadfilterchange";
function subscribeToUrl(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}
function readFilterFromUrl(): Filter {
  const v = new URLSearchParams(window.location.search).get("squad");
  return isFilter(v) ? v : "ALL";
}

function PlayerCard({ person, tag }: { person: Person; tag: string }) {
  const isStaff = person.role === "STAFF";
  return (
    <li className={styles.card}>
      <div className={styles.info}>
        {isStaff ? <span className={styles.staffTitle}>{person.staffTitle}</span> : <span className={styles.number}>{person.number}</span>}
        <span className={styles.first}>{person.firstName}</span>
        <span className={styles.last}>
          {person.lastName}
          {person.captain && (
            <abbr className={styles.captain} title="Captain">
              C
            </abbr>
          )}
        </span>
        <span className={styles.tag}>{tag}</span>
      </div>
      <div className={styles.portrait}>
        <Image
          src={person.photo ?? "/images/player-placeholder.svg"}
          alt={person.photo ? `${person.firstName} ${person.lastName}` : ""}
          fill
          sizes="(min-width: 1024px) 14rem, 40vw"
          quality={70}
          unoptimized={!person.photo}
          className={styles.photo}
        />
      </div>
    </li>
  );
}

/**
 * Squad page (PRD §5.3): Arsenal-style compact cards, grouped by position,
 * groups fold open and shut (DECISIONS.md 11 Oct). The position filter lives
 * in the URL (?squad=DF) so a view can be shared; the server renders "All".
 */
export function Squad({ squad }: { squad: Person[] }) {
  const filter = useSyncExternalStore(subscribeToUrl, readFilterFromUrl, () => "ALL" as Filter);
  const [closed, setClosed] = useState<Set<Role>>(new Set());

  const choose = (f: Filter) => {
    const url = new URL(window.location.href);
    if (f === "ALL") url.searchParams.delete("squad");
    else url.searchParams.set("squad", f);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(URL_EVENT));
  };
  const toggle = (role: Role) =>
    setClosed((prev) => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });

  const groups = GROUPS.map((g) => ({ ...g, people: squad.filter((p) => p.role === g.role) })).filter((g) => g.people.length > 0);
  const visible = filter === "ALL" ? groups : groups.filter((g) => g.role === filter);

  return (
    <section id="squad" className="section" aria-label="Squad list">
      <div className="container">
        <div className={styles.filters} role="group" aria-label="Filter squad by position">
          {[{ role: "ALL" as Filter, filter: "All" }, ...groups].map((g) => (
            <button key={g.role} type="button" className={styles.pill} aria-pressed={filter === g.role} onClick={() => choose(g.role)}>
              {g.filter}
            </button>
          ))}
        </div>

        {visible.map((g) => {
          const open = !closed.has(g.role);
          return (
            <div key={g.role} className={styles.group}>
              <h2 className={styles.groupHead}>
                <button
                  type="button"
                  className={styles.groupToggle}
                  aria-expanded={open}
                  aria-controls={`group-${g.role}`}
                  onClick={() => toggle(g.role)}
                >
                  <span>{g.heading}</span>
                  <span className={styles.count}>{g.people.length}</span>
                  <ChevronDown className={styles.chevron} aria-hidden="true" />
                </button>
              </h2>
              <ul role="list" id={`group-${g.role}`} className={styles.grid} hidden={!open}>
                {g.people.map((p) => (
                  <PlayerCard key={p.id} person={p} tag={g.tag} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
