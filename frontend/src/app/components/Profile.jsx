
export default function Profile({ setLogout }) {

    const handleLogout = async (e) => {
        await fetch("http://localhost:5000/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setLogout(null); // hapus state user
    }
    return (
        <div className="relative w-full h-[250px] bg-[var(--background)] flex flex-col items-center rounded-b-2xl">
            <div
                onClick={handleLogout}
                className="absolute bottom-4 px-5 py-0.5 bg-red-500 text-white font-normal rounded-lg">
                <a className="text-sm">LOGOUT</a>
            </div>
        </div>
    );
}