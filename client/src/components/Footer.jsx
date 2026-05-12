import { Link } from 'react-router-dom';
import { HeartPulse, Mail, Phone, MapPin } from 'lucide-react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const { user } = useSelector((state) => state.auth);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white pt-20 pb-10 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-xl">
              <HeartPulse className="text-white" size={24} />
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Cure<span className="text-primary">Sphere</span>
            </span>
          </Link>
          <p className="text-gray-400 leading-relaxed">
            Revolutionizing healthcare with technology. Providing accessible, affordable, and quality medical services at your fingertips.
          </p>
          <div className="flex gap-4">
            {/* Social icons removed for compatibility */}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="flex flex-col gap-4 text-gray-400">
            {user?.role !== 'doctor' && <li><Link to="/doctors" className="hover:text-primary transition-colors">Find Doctors</Link></li>}
            <li><Link to="/pharmacy" className="hover:text-primary transition-colors">Online Pharmacy</Link></li>
            {user?.role !== 'doctor' && <li><Link to="/emergency" className="hover:text-primary transition-colors">Emergency Services</Link></li>}
            <li><Link to="/community" className="hover:text-primary transition-colors">Health Community</Link></li>
            <li><Link to="/library" className="hover:text-primary transition-colors">Medical Library</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-gray-400">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="flex flex-col gap-6 text-gray-400">
            <li className="flex gap-3">
              <MapPin size={20} className="text-primary shrink-0" />
              <span>Harsh Vihar, Delhi-93</span>
            </li>
            <li className="flex gap-3">
              <Phone size={20} className="text-primary shrink-0" />
              <span>+91 7683099714</span>
            </li>
            <li className="flex gap-3">
              <Mail size={20} className="text-primary shrink-0" />
              <span>support@curesphere.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
        <p>© {currentYear} CureSphere. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;