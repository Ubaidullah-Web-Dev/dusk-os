import MagneticButton from '../common/MagneticButton';
import data from '../../data/data.json';

const Download = () => {
    const { title, subtitle, button, badges } = data.download;

    const getIcon = (iconName) => {
        if (iconName === 'shield') {
            return (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            );
        }
        return (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        );
    };

    return (
        <section id="download" className="relative py-32 px-6 min-h-screen flex items-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent" />

            <div className="max-w-4xl mx-auto text-center relative z-10 w-full">
                <div className="glass rounded-3xl p-12 md:p-16 relative overflow-hidden" id="download-card">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-50" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 transition-colors duration-300" style={{ color: 'var(--color-text-primary)' }}>
                            {title[0]}<br />{title[1]}
                        </h2>
                        <p className="text-lg mb-10 max-w-xl mx-auto transition-colors duration-300" style={{ color: 'var(--color-text-secondary)' }}>{subtitle}</p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <MagneticButton className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                                <span className="flex items-center justify-center gap-3">
                                    {button.label}
                                    <span className="text-xs opacity-60 font-normal">{button.size}</span>
                                </span>
                            </MagneticButton>
                        </div>

                        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
                            {badges.map((badge, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    {getIcon(badge.icon)}
                                    {badge.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Download;
