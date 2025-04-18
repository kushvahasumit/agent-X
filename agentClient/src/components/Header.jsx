

function Header() {
  return (
    <div className="p-4 w-full">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-stone-500 to-white text-transparent bg-clip-text font-[Poppins]">
          Agent
        </h1>
        <img
          src="../../x.png"
          height={40}
          width={40}
          alt="X logo"
          className="ml-1"
        />
      </div>
    </div>
  );
}

export default Header;
