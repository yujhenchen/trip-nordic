import { DialogProvider } from "@/components/providers/DialogProvider";

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DialogProvider>
      <section>{children}</section>
    </DialogProvider>
  );
}
