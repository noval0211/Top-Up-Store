

export default function Footer() {
    return (
        <footer className="w-full h-fit flex flex-col gap-2 items-center justify-center bg-[var(--foreground)] text-white">
            <div className="flex p-10 gap-20">
                <div className="w-[50%] h-fit flex flex-col gap-5 text-sm">
                    <h2 className="text-center text-lg font-bold border-b-2 pb-2 ">About Store</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo cum reprehenderit nesciunt, velit adipisci aut eveniet quibusdam laboriosam facere, hic in? Nobis mollitia perspiciatis, tempora aliquid voluptate repudiandae earum quas.</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo cum reprehenderit nesciunt, velit adipisci aut eveniet quibusdam laboriosam facere, hic in? Nobis mollitia perspiciatis, tempora aliquid voluptate repudiandae earum quas.</p>
                </div>
                <div className="w-[50%] h-fit flex flex-col gap-5 text-sm">
                    <h2 className="text-center text-lg font-bold border-b-2 pb-2 ">Games</h2>
                    <ul className="w-full grid grid-flow-col grid-rows-2 gap-3">
                        <li className="border-b-1 p-1">Mobile Legends: Bang Bang</li>
                        <li className="border-b-1 p-1">Pubg</li>
                        <li className="border-b-1 p-1">Roblox</li>
                        <li className="border-b-1 p-1">Genshin Impact</li>
                        <li className="border-b-1 p-1">Honkai star Rail</li>
                        <li className="border-b-1 p-1">Zenless Zone Zero</li>
                    </ul>
                </div>

            </div>
            <div className="text-white bg-black w-full text-center text-sm py-1">
                <p> Copyright &copy; 2025 NAME.STORE</p>
            </div>
        </footer>
    )
}