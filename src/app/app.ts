import { Component, signal, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  isScrolled = signal(false);
  mobileMenuOpen = signal(false);
  currentSlide = signal(0);
  visibleSections = signal<Set<string>>(new Set(['hero']));

  screenshots = [
    { src: 'assets/screenshots/01-accueil.png', title: 'Accueil', description: 'Créez ou rejoignez un groupe en un clic' },
    { src: 'assets/screenshots/02-creation-groupe.png', title: 'Création de groupe', description: 'Personnalisez votre tontine selon vos besoins' },
    { src: 'assets/screenshots/03-code-partage.png', title: 'Code de partage', description: 'Invitez vos proches avec un simple code' },
    { src: 'assets/screenshots/04-apercu-groupe.png', title: 'Aperçu du groupe', description: 'Suivez la cagnotte et le prochain tirage' },
    { src: 'assets/screenshots/05-membres.png', title: 'Membres', description: 'Gérez les membres et l\'ordre de tirage' },
    { src: 'assets/screenshots/06-tirage.png', title: 'Tirage', description: 'Lancez le tirage en toute transparence' },
    { src: 'assets/screenshots/07-gagnant.png', title: 'Gagnant', description: 'Le bénéficiaire est désigné automatiquement' },
    { src: 'assets/screenshots/08-historique-paiements.png', title: 'Historique', description: 'Suivez tous les paiements en détail' },
    { src: 'assets/screenshots/09-inviter-membres.png', title: 'Invitation', description: 'Partagez via SMS, WhatsApp ou QR code' },
    { src: 'assets/screenshots/10-notifications.png', title: 'Notifications', description: 'Restez informé de chaque événement' },
  ];

  features = [
    { icon: '👥', title: 'Groupes illimités', description: 'Créez autant de groupes que vous voulez et gérez-les tous depuis une seule application.', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { icon: '🎲', title: 'Tirages équitables', description: 'Tirages 100% aléatoires et transparents. Chaque membre peut vérifier le processus.', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { icon: '💰', title: 'Suivi des cotisations', description: 'Visualisez en temps réel qui a payé, qui est en attente et l\'état de la cagnotte.', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { icon: '📱', title: 'QR Code & Partage', description: 'Invitez vos proches facilement via QR code, SMS ou lien de partage.', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { icon: '🔔', title: 'Notifications', description: 'Rappels automatiques pour les cotisations et notifications en temps réel.', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { icon: '💱', title: 'Multi-devises', description: 'Gérez vos tontines en Euros, Francs CFA, Dollars et bien plus.', gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  ];

  stats = [
    { icon: '👥', value: '∞', label: 'Groupes' },
    { icon: '🎲', value: '100%', label: 'Équitable' },
    { icon: '🔒', value: '100%', label: 'Sécurisé' },
    { icon: '💰', value: '0€', label: 'Gratuit' },
  ];

  steps = [
    { icon: '📱', title: 'Créez un groupe', description: 'Définissez le nom, le montant des cotisations et la fréquence des tirages.' },
    { icon: '👥', title: 'Invitez vos proches', description: 'Partagez le code d\'invitation par SMS, WhatsApp ou QR code.' },
    { icon: '🎉', title: 'Lancez les tirages', description: 'Le système désigne automatiquement et équitablement le bénéficiaire.' },
  ];

  ngOnInit() {
    this.setupIntersectionObserver();
    this.startCarousel();
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isVisible(section: string): boolean {
    return this.visibleSections().has(section);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.visibleSections.update(set => {
              const newSet = new Set(set);
              newSet.add(entry.target.id);
              return newSet;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['hero', 'features', 'stats', 'screenshots', 'how-it-works', 'transparency', 'download'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  prevSlide() {
    this.currentSlide.update(v => (v - 1 + this.screenshots.length) % this.screenshots.length);
  }

  nextSlide() {
    this.currentSlide.update(v => (v + 1) % this.screenshots.length);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }
}
