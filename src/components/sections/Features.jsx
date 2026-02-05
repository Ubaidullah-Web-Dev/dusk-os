import TiltCard from '../common/TiltCard';
import data from '../../data/data.json';

const Features = () => {
    const { title, subtitle, cards } = data.features;

    const getIcon = (iconName) => {
        const icons = {
            desktop: (
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            bolt: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            lock: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
            code: (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
            ),
            refresh: (
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            )
        };
        return icons[iconName] || null;
    };

    const renderCard = (card) => {
        if (card.size === 'large') {
            return (
                <TiltCard
                    key={card.id}
                    className="lg:col-span-2 lg:row-span-2 rounded-3xl p-8 relative overflow-hidden group cursor-pointer transition-colors duration-300"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                    }}
                >
                    <div className="tilt-card-content relative z-10 h-full flex flex-col">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                            {getIcon(card.icon)}
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{card.title}</h3>
                        <p className="mb-6 max-w-md transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>{card.description}</p>
                        <div className="flex-1 relative mt-4">
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent z-10" />
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover rounded-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 transform group-hover:scale-105"
                            />
                        </div>
                    </div>
                </TiltCard>
            );
        }

        if (card.size === 'wide') {
            return (
                <TiltCard
                    key={card.id}
                    className="lg:col-span-2 rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-colors duration-300"
                    style={{
                        background: 'linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(59, 130, 246, 0.1))',
                        borderColor: 'var(--color-border)',
                        borderWidth: '1px',
                        borderStyle: 'solid'
                    }}
                >
                    <div className="tilt-card-content flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{card.title}</h3>
                            <p className="transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>{card.description}</p>
                        </div>
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700">
                            {getIcon(card.icon)}
                        </div>
                    </div>
                </TiltCard>
            );
        }

        // Small card
        return (
            <TiltCard
                key={card.id}
                className="rounded-3xl p-6 relative overflow-hidden group cursor-pointer transition-colors duration-300"
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'var(--color-border)',
                    borderWidth: '1px',
                    borderStyle: 'solid'
                }}
            >
                <div className="tilt-card-content">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-4`}>
                        {getIcon(card.icon)}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>{card.title}</h3>
                    <p className="text-sm mb-4 transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>{card.description}</p>

                    {card.id === 'fast' && (
                        <div className="flex items-end gap-1 h-20">
                            <div className="flex-1 bg-white/10 rounded-t" style={{ height: '40%' }} />
                            <div className="flex-1 bg-white/20 rounded-t" style={{ height: '60%' }} />
                            <div className="flex-1 bg-purple-500/40 rounded-t" style={{ height: '80%' }} />
                            <div className="flex-1 bg-purple-500 rounded-t" style={{ height: '100%' }} />
                        </div>
                    )}

                    {card.emojis && (
                        <div className="mt-4 flex -space-x-2">
                            {card.emojis.map((emoji, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#050508] flex items-center justify-center text-xs">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                    )}

                    {card.tags && (
                        <div className="flex gap-2 flex-wrap">
                            {card.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </TiltCard>
        );
    };

    return (
        <section id="features" className="relative py-32 px-6 bg-[#050508]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-display text-5xl md:text-7xl font-bold mb-6" style={{ color: 'var(--color-text-primary)' }}>
                        {title[0]}<br />
                        <span className="gradient-text">{title[1]}</span>
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 perspective-1000">
                    {cards.map(renderCard)}
                </div>
            </div>
        </section>
    );
};

export default Features;
