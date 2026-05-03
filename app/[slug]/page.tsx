import { notFound } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getClientBySlug, markViewed } from "@/lib/db";

export const dynamic = "force-dynamic";

export default function ClientPortalPage({
  params,
}: {
  params: { slug: string };
}) {
  const client = getClientBySlug(params.slug);
  if (!client) notFound();
  markViewed(params.slug);
  return <PortalShell client={{ ...client, viewed: 1 }} />;
}
