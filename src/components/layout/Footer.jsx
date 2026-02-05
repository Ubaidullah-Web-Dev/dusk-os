import MagneticButton from '../common/MagneticButton';
import data from '../../data/data.json';

const Footer = () => {
    const { brand, links } = data.footer;
    const { copyright } = data.site;

    return (
        <footer className="relative py-16 px-6 border-t border-white/5 bg-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <span className="font-display font-bold text-xl text-white">{brand}</span>
                    </div>

                    <div className="flex gap-8 text-sm text-white/40">
                        {links.map((link, index) => (
                            <MagneticButton key={index} as="a" href={link.href} className="hover:text-white transition-colors">
                                {link.label}
                            </MagneticButton>
                        ))}
                    </div>

                    <div className="text-sm text-white/20">
                        {copyright}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
