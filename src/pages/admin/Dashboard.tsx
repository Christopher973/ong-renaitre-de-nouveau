import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, setToken, imgUrl, newsApi, videosApi, projectsApi, teamApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Tab = "news" | "videos" | "projects" | "team";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("news");
  const [items, setItems] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!getToken()) navigate("/admin");
  }, [navigate]);

  const apiFor = { news: newsApi, videos: videosApi, projects: projectsApi, team: teamApi }[tab];

  const load = async () => {
    setLoading(true);
    try {
      const data = await apiFor.list();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    setEditing(null);
  }, [tab]);

  const handleLogout = () => {
    setToken(null);
    navigate("/admin");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet élément ?")) return;
    await apiFor.remove(id);
    load();
  };

  const openNew = () => {
    const defaults: Record<Tab, any> = {
      news: { title: "", content: "", published: true },
      videos: { title: "", youtube_url: "", description: "" },
      projects: { project_name: "", title: "", content: "" },
      team: { name: "", role: "", team_group: "", bio: "", order_index: 0 },
    };
    setEditing({ ...defaults[tab], id: null });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isFormData = tab === "news" || tab === "projects" || tab === "team";
    let payload: any;

    if (isFormData) {
      const fd = new FormData();
      Object.entries(editing).forEach(([k, v]) => {
        if (k === "id" || k === "image" || k === "photo") return;
        if (v !== null && v !== undefined) fd.append(k, String(v));
      });
      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput?.files && fileInput.files.length > 0) {
        if (tab === "news") {
          Array.from(fileInput.files).forEach((file) => fd.append("images", file));
        } else {
          fd.append(tab === "team" ? "photo" : "image", fileInput.files[0]);
        }
      }
      payload = fd;
    } else {
      payload = editing;
    }

    if (editing.id) {
      await apiFor.update(editing.id, payload);
    } else {
      await apiFor.create(payload);
    }
    setEditing(null);
    load();
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "news", label: "Actualités" },
    { key: "videos", label: "Vidéos" },
    { key: "projects", label: "Avancées de projets" },
    { key: "team", label: "Équipe" },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-background border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Administration — Renaître de Nouveau</h1>
        <Button variant="outline" onClick={handleLogout}>Déconnexion</Button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                tab === t.key ? "bg-primary text-primary-foreground" : "bg-background border"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{tabs.find((t) => t.key === tab)?.label}</h2>
          <Button onClick={openNew}>+ Ajouter</Button>
        </div>

        {editing && (
          <form onSubmit={handleSave} className="bg-background border rounded-lg p-4 mb-6 space-y-3">
            {tab === "news" && (
              <>
                <Input placeholder="Titre" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
                <Textarea placeholder="Contenu" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} required rows={5} />
              </>
            )}
            {tab === "videos" && (
              <>
                <Input placeholder="Titre" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
                <Input placeholder="Lien YouTube" value={editing.youtube_url} onChange={(e) => setEditing({ ...editing, youtube_url: e.target.value })} required />
                <Textarea placeholder="Description (optionnel)" value={editing.description || ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} />
              </>
            )}
            {tab === "projects" && (
              <>
                <Input placeholder="Nom du projet (ex: ARF Bénin)" value={editing.project_name} onChange={(e) => setEditing({ ...editing, project_name: e.target.value })} required />
                <Input placeholder="Titre de l'avancée" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} required />
                <Textarea placeholder="Détails" value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} required rows={5} />
              </>
            )}
            {tab === "team" && (
              <>
                <Input placeholder="Nom" value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} required />
                <Input placeholder="Rôle" value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} required />
                <Input placeholder="Groupe / pays (ex: France, Bénin, Stagiaires)" value={editing.team_group || ""} onChange={(e) => setEditing({ ...editing, team_group: e.target.value })} />
                <Textarea placeholder="Bio (optionnel)" value={editing.bio || ""} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} rows={3} />
              </>
            )}
            {(tab === "news" || tab === "projects" || tab === "team") && (
              <div>
                <label className="text-sm font-medium block mb-1">Image</label>
                <input id="file-upload" type="file" accept="image/*" multiple={tab === "news"} />
              </div>
            )}
            <div className="flex gap-2">
              <Button type="submit">Enregistrer</Button>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>Annuler</Button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-muted-foreground">Chargement...</p>
        ) : items.length === 0 ? (
          <p className="text-muted-foreground">Aucun élément pour le moment.</p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="bg-background border rounded-lg p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {(item.image || item.photo) && (
                    <img src={imgUrl(item.image || item.photo)} alt="" className="w-12 h-12 object-cover rounded" />
                  )}
                  <div className="min-w-0">
                    <p className="font-medium truncate">{item.title || item.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.project_name || item.role || item.youtube_url || ""}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button size="sm" variant="outline" onClick={() => setEditing(item)}>Modifier</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>Supprimer</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
