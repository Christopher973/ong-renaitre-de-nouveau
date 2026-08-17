import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Users, MapPin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { teamApi, imgUrl } from '@/lib/api';

type Member = {
  id: number;
  name: string;
  role: string;
  team_group: string | null;
  photo: string | null;
  bio: string | null;
};

const Team = () => {
  const [heroRef, heroVisible] = useScrollAnimation<HTMLElement>();
  const [contentRef, contentVisible] = useScrollAnimation<HTMLElement>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamApi
      .list()
      .then(setMembers)
      .catch(() => setMembers([]))
      .finally(() => setLoading(false));
  }, []);

  const groups = members.reduce<Record<string, Member[]>>((acc, m) => {
    const key = m.team_group || 'Équipe';
    if (!acc[key]) acc[key] = [];
    acc[key].push(m);
    return acc;
  }, {});

  const TeamCard = ({ member, index }: { member: Member; index: number }) => (
    <div
      className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {member.photo ? (
        <img
          src={imgUrl(member.photo)}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover mb-4 mx-auto shadow-cobalt"
        />
      ) : (
        <div className="w-20 h-20 bg-gradient-to-br from-cobalt to-cobalt-light rounded-full flex items-center justify-center mb-4 mx-auto shadow-cobalt">
          <span className="text-white font-bold text-2xl">
            {member.name.split(' ').map((n) => n[0]).join('')}
          </span>
        </div>
      )}
      <div className="text-center">
        <h3 className="font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-cobalt font-medium text-sm mb-3">{member.role}</p>
        {member.bio && <p className="text-muted-foreground text-sm">{member.bio}</p>}
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 bg-gradient-to-br from-cobalt via-cobalt to-cobalt-dark text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div
            className={cn(
              'max-w-3xl transition-all duration-700',
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            )}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="w-4 h-4" />
              Notre équipe
            </span>
            <h1 className="text-white mb-6">Les visages de l'espoir</h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Des hommes et des femmes dévoués qui travaillent chaque jour pour transformer
              des vies en France et au Bénin.
            </p>
          </div>
        </div>
      </section>

      {/* Groupes dynamiques */}
      <section ref={contentRef} className="section-padding bg-warm-white">
        <div className="container-custom">
          {loading ? (
            <p className="text-center text-muted-foreground">Chargement de l'équipe...</p>
          ) : Object.keys(groups).length === 0 ? (
            <p className="text-center text-muted-foreground">Aucun membre pour le moment.</p>
          ) : (
            Object.entries(groups).map(([groupName, groupMembers]) => (
              <div key={groupName} className="mb-16 last:mb-0">
                <div
                  className={cn(
                    'text-center mb-12 transition-all duration-700',
                    contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  )}
                >
                  <div className="inline-flex items-center gap-2 badge-primary mb-4">
                    <MapPin className="w-4 h-4" />
                    {groupName}
                  </div>
                  <h2>Équipe {groupName}</h2>
                </div>
                <div
                  className={cn(
                    'grid sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700',
                    contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  )}
                >
                  {groupMembers.map((member, index) => (
                    <TeamCard key={member.id} member={member} index={index} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-20 bg-cobalt">
        <div className="container-custom text-center">
          <h2 className="text-white mb-6">Rejoignez notre équipe</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Vous souhaitez mettre vos compétences au service d'une cause noble ?
            Devenez bénévole ou stagiaire chez Renaître de Nouveau.
          </p>
          <a href="/contact" className="btn-white inline-flex">
            <Mail className="w-5 h-5 mr-2" />
            Nous contacter
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Team;
