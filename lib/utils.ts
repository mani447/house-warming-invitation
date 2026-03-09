export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateCSV(
  rows: Array<{
    name: string;
    contact: string;
    attending: boolean;
    guest_count: number;
    created_at: string;
  }>
): string {
  const header = "Name,Contact,Attending,Guests,Submitted At\n";
  const body = rows
    .map(
      (r) =>
        `"${r.name}","${r.contact}",${r.attending ? "Yes" : "No"},${r.guest_count},"${formatDate(r.created_at)}"`
    )
    .join("\n");
  return header + body;
}
