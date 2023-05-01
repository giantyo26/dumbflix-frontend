import { Link } from "react-router-dom";
export default function PageNotFound() {
  return (
    <main class="h-screen w-full flex flex-col justify-center items-center bg-black">
      <h1 class="text-9xl font-extrabold text-white">404</h1>
      <div class="bg-darkRed px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <button class="mt-5">
        <a class="relative inline-block text-sm font-medium text-darkRed group ">
          <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to={"/"}>Go Home</Link>
          </span>
        </a>
      </button>
    </main>
  );
}
