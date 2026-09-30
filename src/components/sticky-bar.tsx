import { STORE, MAPS_DIRECTIONS_URL } from "@/lib/store";

export function StickyBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-navy px-3 py-3 md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2">
        <a
          href={STORE.mrdUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center rounded-sm bg-gold px-3 py-3 text-center font-body text-[11px] font-bold uppercase tracking-[0.1em] text-navy transition-colors hover:bg-gold-bright"
        >
          Order on Mr D
        </a>
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center rounded-sm border border-cream/30 px-3 py-3 text-center font-body text-[11px] font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-cream/10"
        >
          Visit
        </a>
        <a
          href={STORE.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Vape Barn on Instagram"
          className="flex flex-1 items-center justify-center rounded-sm border border-cream/30 px-3 py-3 text-center font-body text-[11px] font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-cream/10"
        >
          Instagram
        </a>
      </div>
    </nav>
  );
}
