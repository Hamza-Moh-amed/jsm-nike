
const ActiveBadges = ({sp}: {sp: Record<string, string | string[] | undefined>}) => {

    const activeBadges: string[] = [];

    (sp.gender ? (Array.isArray(sp.gender) ? sp.gender : [sp.gender]) : []).forEach((g) => 
    activeBadges.push(String(g)[0].toUpperCase() + String(g).slice(1))
    );

    (sp.size ? (Array.isArray(sp.size) ? sp.size : [sp.size]): []).forEach((s) => activeBadges.push(`Size: ${s}`));

    (sp.color ? (Array.isArray(sp.color) ? sp.color : [sp.color]) : []).forEach((c) => activeBadges.push(String(c)[0].toUpperCase() + String(c).slice(1)));

    (sp.price ? (Array.isArray(sp.price) ? sp.price : [sp.price]) : []).forEach((p) => {
      const [min, max] = String(p).split("-");
      const label = min && max ? `$${min} - $${max}` : min && !max ? `Over $${min}` : `$0 - $${max}`;
      activeBadges.push(label);
    });
  return (
    <>
    {activeBadges.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {activeBadges.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="rounded-full border border-light-300 px-3 py-1 text-caption text-dark-900"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </>
  )
}

export default ActiveBadges