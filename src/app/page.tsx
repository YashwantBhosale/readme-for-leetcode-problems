import SearchInput from "@/components/search/Search";

export default function Home() {
  return (
    <div className="pt-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center">Welcome!</h1>
      <p className="mt-5 text-center">
        Welcome to leetcode problems readme generator. You can search for problems and generate markdown files for them.
      </p>
      <SearchInput className="w-full max-w-md mt-10" />
    </div>
  );
}
