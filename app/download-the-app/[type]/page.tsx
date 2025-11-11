import User from "../User";
import Driver from "../Driver";

export default async function downloadTheApp({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  return (
    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 p-6 md:p-20  gap-14">
      {type == "user" ? <User /> : <Driver />}
    </div>
  );
}
