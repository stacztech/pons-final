import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';

interface Category {
  name: string;
  image: string;
  route: string;
  description: string;
}

interface ComboPack {
  name: string;
  items: string[];
  weight: string;
  price: number;
  image: string;
  isAddedToCart?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styleUrls: ['./home.component.css'],
  template: `
    <div class="home-container">
      <!-- Welcome Banner Section -->
      <div class="welcome-banner">
        <div class="banner-content">
          <h1>PONS Mutton Stall & Broilers</h1>
          <p class="banner-subtitle">Your favourite meat shop is now online</p>
          <button class="shop-now-btn" (click)="scrollToCategories()">Shop Now</button>
              </div>
        <div class="banner-image-container">
          <img src="assets/images/ban11.jpeg" alt="Fresh Chicken" class="banner-img">
            </div>
          </div>

      <!-- Carousel and QR Section -->
      <div class="carousel-section">
        <div class="carousel-container">
          <div class="carousel-grid">
            <!-- Left Side: Main Carousel -->
            <div class="main-carousel">
              <div class="carousel">
                <div class="carousel-track" [style.transform]="'translateX(-' + (currentSlide * 100) + '%)'">
                  <div class="carousel-slide" *ngFor="let item of carouselItems">
                    <div class="carousel-content">
                      <img [src]="item.image" [alt]="item.title" class="carousel-image">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Carousel Controls -->
              <button class="carousel-control prev" (click)="prevSlide()">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button class="carousel-control next" (click)="nextSlide()">
                <i class="bi bi-chevron-right"></i>
              </button>

              <!-- Carousel Indicators -->
              <div class="carousel-indicators">
                <button *ngFor="let _ of carouselItems; let i = index" 
                      [class.active]="i === currentSlide"
                      (click)="goToSlide(i)">
                </button>
              </div>
            </div>
            
            <!-- Right Side: QR Section -->
            <div class="qr-section">
              <div class="qr-carousel" [style.transform]="'translateX(-' + (currentQR * 100) + '%)'">
                <div class="qr-item" *ngFor="let qr of qrCodes">
                  <img [src]="qr.image" [alt]="qr.name" class="qr-image">
                  <div class="qr-label">{{ qr.name }}</div>
                </div>
              </div>
              <div class="qr-indicators">
                <button *ngFor="let qr of qrCodes; let i = index" 
                        [class.active]="i === currentQR"
                        (click)="goToQR(i)">
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Categories Section -->
      <section class="categories-section" #categoriesSection>
        <div class="section-header">
          <h2>Shop by Category</h2>
        </div>
          <div class="categories-grid">
            <a [routerLink]="category.route" class="category-card" *ngFor="let category of mainCategories">
            <div class="category-image">
              <img [src]="category.image" [alt]="category.name">
            </div>
            <h3>{{ category.name }}</h3>
            <p>{{ category.description }}</p>
            </a>
        </div>
      </section>

      <!-- Combo Packs Section -->
      <section class="combo-packs-section">
        <div class="section-header">
          <h2>Special Combo Packs</h2>
        </div>
        <div class="combo-packs-grid">
          <div class="combo-pack-card" *ngFor="let pack of comboPacks">
            <div class="combo-image">
              <img [src]="pack.image" [alt]="pack.name">
              <div class="combo-badge">COMBO</div>
            </div>
            <div class="combo-info">
              <h3>{{ pack.name }}</h3>
              <ul class="combo-items">
                <li *ngFor="let item of pack.items">{{ item }}</li>
              </ul>
              <div class="combo-details">
                <span class="weight">{{ pack.weight }}</span>
                <span class="price">₹{{ pack.price }}</span>
              </div>
              <div class="button-group">
                <button class="btn-buy-now" (click)="buyNowCombo(pack)">
                  Buy Now
                </button>
                <button class="btn-add-cart" 
                        [class.added]="pack.isAddedToCart"
                        (click)="addComboToCart(pack)">
                  <span *ngIf="!pack.isAddedToCart">Add to Cart</span>
                  <span *ngIf="pack.isAddedToCart">
                    <i class="bi bi-check-circle-fill"></i> Added to Cart
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('categoriesSection') categoriesSection!: ElementRef;
  
  currentSlide = 0;
  currentQR = 0;
  private autoScrollInterval: any;
  private qrScrollInterval: any;

  carouselItems = [
    {
      title: 'Fresh Farm Chicken',
      description: 'Enjoy organic chicken delivered to your doorstep!',
      image: 'assets/images/p1.jpg'
    },
    {
      title: 'Weekend Special',
      description: 'Get 20% off on combo meat packs this weekend!',
      image: 'assets/images/p2.jpg'
    },
    {
      title: 'Premium Cuts',
      description: 'Premium goat, quail, and turkey meat now available!',
      image: 'assets/images/p3.jpeg'
    }
  ];

  qrCodes = [
    {
      name: 'POS',
      image: 'assets/images/pos1.PNG'
    },
    {
      name: 'WhatsApp',
      image: 'assets/images/qr1.jpeg'
    },
    {
      name: 'Instagram',
      image: 'assets/images/qr2.jpeg'
    }
  ];

  mainCategories: Category[] = [
    {
      name: 'Chicken',
      image: 'assets/images/m1.jpg',
      route: '/chicken',
      description: 'Fresh farm-raised chicken'
    },
    {
      name: 'Country Chicken',
      image: 'assets/images/m2.png',
      route: '/country-chicken',
      description: 'Traditional free-range chicken'
    },
    {
      name: 'Japanese Quail',
      image: 'assets/images/m3.jpg',
      route: '/japanese-quail',
      description: 'Premium quality quail meat'
    },
    {
      name: 'Turkey Bird',
      image: 'assets/images/m4.jpg',
      route: '/turkey',
      description: 'Fresh turkey meat'
    },
    {
      name: 'Goat',
      image: 'assets/images/m5.jpg',
      route: '/goat',
      description: 'Premium goat meat cuts'
    }
  ];

  comboPacks: ComboPack[] = [
    {
      name: 'Gym Protein Pack',
      items: ['Chicken Breast Boneless'],
      weight: '250g',
      price: 100,
      image: 'assets/images/Gym Pack.jpg',
      isAddedToCart: false
    },
    {
      name: 'Pets Special Pack',
      items: ['Chicken Bone'],
      weight: '1kg',
      price: 70,
      image: 'assets/images/cb.webp',
      isAddedToCart: false
    },
    {
      name: 'Liver Pack',
      items: ['Liver Frozen'],
      weight: '1kg',
      price: 90,
      image: 'assets/images/Chicken liver .jpg',
      isAddedToCart: false
    },
    {
      name: 'Leg Pack',
      items: ['Chicken Leg'],
      weight: '1kg',
      price: 50,
      image: 'assets/images/legpack.avif',
      isAddedToCart: false
    }
  ];

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.startAutoScroll();
    this.startQRScroll();
  }

  ngOnDestroy() {
    this.stopAutoScroll();
    this.stopQRScroll();
  }

  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  stopAutoScroll() {
    if (this.autoScrollInterval) {
      clearInterval(this.autoScrollInterval);
    }
  }

  startQRScroll() {
    this.qrScrollInterval = setInterval(() => {
      this.nextQR();
    }, 3000);
  }

  stopQRScroll() {
    if (this.qrScrollInterval) {
      clearInterval(this.qrScrollInterval);
    }
  }

  nextSlide() {
    this.stopAutoScroll();
    this.currentSlide = (this.currentSlide + 1) % this.carouselItems.length;
    this.startAutoScroll();
  }

  prevSlide() {
    this.stopAutoScroll();
    this.currentSlide = this.currentSlide === 0 ? 
      this.carouselItems.length - 1 : this.currentSlide - 1;
    this.startAutoScroll();
  }

  goToSlide(index: number) {
    this.stopAutoScroll();
    this.currentSlide = index;
    this.startAutoScroll();
  }

  nextQR() {
    this.currentQR = (this.currentQR + 1) % this.qrCodes.length;
  }

  goToQR(index: number) {
    this.currentQR = index;
  }

  addComboToCart(pack: ComboPack) {
    const cartItem: CartItem = {
      id: pack.name,
      name: pack.name,
      price: pack.price,
      quantity: 1,
      image: pack.image,
      weight: pack.weight
    };

    this.cartService.addToCart(cartItem);
    pack.isAddedToCart = true;

    setTimeout(() => {
      pack.isAddedToCart = false;
    }, 2000);
  }

  getAllSlides() {
    return this.carouselItems;
  }

  scrollToCategories() {
    this.categoriesSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }

  buyNowCombo(pack: ComboPack) {
    const cartItem: CartItem = {
      id: pack.name,
      name: pack.name,
      price: pack.price,
      quantity: 1,
      image: pack.image,
      weight: pack.weight
    };

    this.cartService.addToCart(cartItem);
    this.router.navigate(['/checkout']);
  }

  getBadgeIcon(type: string) {
    switch (type) {
      case 'chicken':
        return 'bi-egg-fried';
      case 'goat':
        return 'bi-heart';
      case 'quail':
        return 'bi-bird';
      default:
        return 'bi-star';
    }
  }

  onOrderNowClick() {
    this.router.navigate(['/chicken']);
  }
}