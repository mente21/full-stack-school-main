import Image from "next/image";

export default function Loading() {
    return (
        <div className="w-full h-screen flex items-center justify-center bg-slate-50/50 backdrop-blur-sm z-50">
            <div className="relative flex flex-col items-center gap-4">
                {/* Pulsing Logo */}
                <div className="relative">
                    <div className="absolute inset-0 bg-lamaSky/30 rounded-full blur-xl animate-pulse"></div>
                    <Image
                        src="/logo.png"
                        alt="Loading..."
                        width={80}
                        height={80}
                        className="animate-bounce relative z-10"
                    />
                </div>
                <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lamaSky to-lamaPurple animate-pulse">
                    Mente&apos;s School
                </div>
            </div>
        </div>
    );
}
