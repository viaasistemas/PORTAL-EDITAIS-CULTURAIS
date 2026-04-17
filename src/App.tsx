import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "./components/SessionContextProvider";
import Index from "./pages/Index";
import Editais from "./pages/Editais";
import EditaisPNAB from "./pages/EditaisPNAB";
import EditaisLPG from "./pages/EditaisLPG";
import EditaisFM from "./pages/EditaisFM";
import Inscricoes from "./pages/Inscricoes";
import Biblioteca from "./pages/Biblioteca";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AdminInscricoes from "./pages/AdminInscricoes";
import AdminEditalDetalhes from "./pages/AdminEditalDetalhes";
import AdminConteudo from "./pages/AdminConteudo";
import AdminConfiguracoes from "./pages/AdminConfiguracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/editais" element={<Editais />} />
            <Route path="/editais/pnab" element={<EditaisPNAB />} />
            <Route path="/editais/lpg" element={<EditaisLPG />} />
            <Route path="/editais/fm" element={<EditaisFM />} />
            <Route path="/inscricoes" element={<Inscricoes />} />
            <Route path="/biblioteca" element={<Biblioteca />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/inscricoes" element={<AdminInscricoes />} />
            <Route path="/admin/inscricoes/:id" element={<AdminEditalDetalhes />} />
            <Route path="/admin/conteudo" element={<AdminConteudo />} />
            <Route path="/admin/configuracoes" element={<AdminConfiguracoes />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);

export default App;