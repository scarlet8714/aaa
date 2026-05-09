export default function LoginContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-auto bg-[#8e735b]  border-0 rounded-xl border-transparent">
      <div className="relative border p-9 rounded-xl border-transparent bg-white top-2 shadow-lg">
        {children}
      </div>
    </div>
  );
}
