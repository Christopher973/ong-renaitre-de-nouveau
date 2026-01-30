import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Heart, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    {
      name: 'À propos',
      path: '/about',
      children: [
        { name: 'Qui sommes-nous', path: '/about' },
        { name: 'Missions & Valeurs', path: '/about#missions' },
        { name: 'Notre Charte', path: '/about#charte' },
        { name: "Zone d'intervention", path: '/about#zones' },
      ],
    },
    {
      name: 'Actions & Projets',
      path: '/actions',
      children: [
        { name: 'Éducation', path: '/actions#education' },
        { name: 'Formation & Insertion', path: '/actions#formation' },
        { name: 'Santé', path: '/actions#sante' },
        { name: 'Sécurité Alimentaire', path: '/actions#securite' },
        { name: 'Sans-abris', path: '/actions#sans-abris' },
        { name: 'Engagement Solidaire', path: '/actions#volontariat' },
      ],
    },
    { name: 'Équipe', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-cobalt rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <div className="hidden sm:block">
              <span className={cn(
                "font-bold text-lg transition-colors duration-300",
                isScrolled ? "text-storm" : "text-white"
              )}>
                Renaître
              </span>
              <span className={cn(
                "block text-sm transition-colors duration-300",
                isScrolled ? "text-cobalt" : "text-white/80"
              )}>
                de Nouveau
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navLinks.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    {link.children ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                            isScrolled
                              ? "text-storm hover:text-cobalt"
                              : "text-white hover:text-white/80"
                          )}
                        >
                          {link.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[250px] gap-1 p-2">
                            {link.children.map((child) => (
                              <li key={child.name}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    to={child.path}
                                    className="block px-4 py-2 text-sm text-storm hover:bg-secondary rounded-lg transition-colors"
                                  >
                                    {child.name}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        className={cn(
                          "nav-link px-4 py-2 rounded-lg transition-colors",
                          isScrolled
                            ? "text-storm hover:text-cobalt"
                            : "text-white hover:text-white/80",
                          location.pathname === link.path && "text-cobalt"
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/volunteer">
              <Button
                variant="outline"
                className={cn(
                  "rounded-full border-2 transition-all duration-300",
                  isScrolled
                    ? "border-cobalt text-cobalt hover:bg-cobalt hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-storm"
                )}
              >
                <Users className="w-4 h-4 mr-2" />
                Bénévole
              </Button>
            </Link>
            <Link to="/donate">
              <Button className="btn-primary">
                <Heart className="w-4 h-4 mr-2" />
                Faire un Don
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-storm" : "text-white"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-fade-in-down">
            <nav className="container-custom py-6">
              {navLinks.map((link) => (
                <div key={link.name} className="py-2">
                  {link.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer text-storm font-medium py-2">
                        {link.name}
                        <ChevronDown className="w-4 h-4 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="pl-4 mt-2 space-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.name}
                            to={child.path}
                            className="block py-2 text-muted-foreground hover:text-cobalt transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={link.path}
                      className="block py-2 text-storm font-medium hover:text-cobalt transition-colors"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                <Link to="/volunteer">
                  <Button variant="outline" className="w-full rounded-full border-2 border-cobalt text-cobalt">
                    <Users className="w-4 h-4 mr-2" />
                    Devenir Bénévole
                  </Button>
                </Link>
                <Link to="/donate">
                  <Button className="w-full btn-primary">
                    <Heart className="w-4 h-4 mr-2" />
                    Faire un Don
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
