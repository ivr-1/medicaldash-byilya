export default function DemoFooter () { 
    return (
        <footer className="flex flex-col items-center gap-3 my-1 opacity-70 ">
            <a href="https://www.byilya.com" target="_blank" rel="noopener noreferrer" className="border-2 px-3 py-2 rounded-xl text-slate-600 border-slate-400 font-extrabold text-sm cursor-pointer bg-active1 hover:scale-105 transition-all">
                 made by Ilya
            </a>
            <p className="md:text-sm text-[12px] font-semibold opacity-30">This is a demo website. All content, including medical information and user data, is fictional and for illustrative purposes only.</p>
        </footer>
    )
}