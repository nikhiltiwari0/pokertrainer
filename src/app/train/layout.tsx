import TrainSubNav from "@/components/navigation/TrainSubNav";

export default function TrainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TrainSubNav />
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </>
  );
}
