import data from '../../data/data.json';

const ParallaxImage = () => {
    const { image, title } = data.parallax;

    return (
        <section className="relative py-32 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[120%] h-[120%] absolute" id="parallax-image-container">
                    <img
                        src={image}
                        alt="Space"
                        className="w-full h-full object-cover opacity-30 blur-sm"
                    />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <h2 className="font-display text-6xl md:text-8xl font-bold mb-6 mix-blend-overlay opacity-50 text-white">
                    {title[0]}<br />{title[1]}
                </h2>
            </div>
        </section>
    );
};

export default ParallaxImage;
