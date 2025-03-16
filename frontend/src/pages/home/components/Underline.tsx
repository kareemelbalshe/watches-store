export default function Underline() {
  return (
    <div className="relative w-4 h-4 rounded-full bg-amber-400 my-2 ">
          <div className="absolute top-1/2 -translate-y-1/2 left-[120%] w-20 h-1 rounded-3xl bg-amber-400 "></div>
          <div className="absolute top-1/2 -translate-y-1/2 right-[120%] w-20 h-1 rounded-3xl bg-amber-400 "></div>
        </div>
  );
}