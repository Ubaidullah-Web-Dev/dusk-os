import data from '../../data/data.json';

const Marquee = () => {
    const { items } = data.marquee;

    // Duplicate items for seamless loop
    const marqueeItems = [...items, ...items];

    return (
        <section className="py-16 overflow-hidden border-y border-white/5 bg-white/[0.02] rotate-1 scale-105">
            <div className="marquee-container">
                <div className="marquee-content flex items-center gap-12 text-4xl md:text-6xl font-display font-bold text-white/10">
                    {marqueeItems.map((item, index) => (
                        <span key={index}>
                            {index > 0 && <span className="text-purple-500/30 mr-12">•</span>}
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
