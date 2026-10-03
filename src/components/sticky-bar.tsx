import { STORE, MAPS_DIRECTIONS_URL, WHATSAPP_URL } from "@/lib/store";

const actionClass =
  "flex flex-1 items-center justify-center rounded-sm border border-cream/30 px-3 py-3 text-center font-body text-[11px] font-bold uppercase tracking-[0.1em] text-cream transition-colors hover:bg-cream/10";

export function StickyBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-navy px-3 py-3 md:hidden"
    >
      <div className="mx-auto flex max-w-md items-stretch gap-2">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message Vape Barn on WhatsApp"
          className={actionClass}
        >
          WhatsApp
        </a>
        <a
          href={MAPS_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClass}
        >
          Visit
        </a>
        <a
          href={STORE.mrdUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={actionClass}
        >
          Order on Mr&nbsp;D
        </a>
      </div>
    </nav>
  );
}
