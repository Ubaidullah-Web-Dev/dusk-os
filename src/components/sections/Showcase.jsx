import data from '../../data/data.json';

const Showcase = () => {
    const { image, ui, cards } = data.showcase;

    return (
        <section id="showcase" className="relative min-h-[300vh] bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 grid-bg opacity-20" />

                <div className="relative w-full max-w-6xl mx-auto px-6 perspective-2000">
                    <div id="device-container" className="relative preserve-3d">

                        <div className="relative bg-gradient-to-b from-[#1a1a2e] to-[#0a0a0f] rounded-3xl border border-white/10 p-2 shadow-2xl" id="main-screen">
                            <div className="bg-black rounded-2xl overflow-hidden aspect-video relative">
                                <img
                                    src={image}
                                    alt="Dusk Desktop"
                                    className="w-full h-full object-cover opacity-80"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-8 left-8 right-8">
                                    <div className="glass rounded-xl p-4 max-w-md opacity-0 translate-y-4" id="screen-ui">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-3 h-3 rounded-full bg-green-400" />
                                            <span className="text-xs font-mono text-white/60">{ui.status}</span>
                                        </div>
                                        <div className="text-lg font-semibold text-white">{ui.title}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            className="absolute -right-20 top-20 w-64 glass rounded-2xl p-4 opacity-0"
                            id="float-card-1"
                            style={{ transform: 'translateZ(100px) rotateY(-15deg)' }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{cards[0].title}</div>
                                    <div className="text-xs transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>{cards[0].subtitle}</div>
                                </div>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                            </div>
                        </div>

                        <div
                            className="absolute -left-20 bottom-32 w-64 glass rounded-2xl p-4 opacity-0"
                            id="float-card-2"
                            style={{ transform: 'translateZ(150px) rotateY(15deg) rotateX(5deg)' }}
                        >
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{cards[1].title}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">{cards[1].status}</span>
                            </div>
                            <div className="space-y-2">
                                {cards[1].features.map((feature, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>
                                        <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Showcase;
