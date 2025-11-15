import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoMetadata {
  readonly title: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly keywords?: readonly string[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  updateTags(metadata: SeoMetadata): void {
    this.title.setTitle(metadata.title);
    this.meta.updateTag({ name: 'description', content: metadata.description ?? '' });

    const keywords = metadata.keywords?.join(', ');
    if (keywords) {
      this.meta.updateTag({ name: 'keywords', content: keywords });
    }

    if (metadata.imageUrl) {
      this.meta.updateTag({ property: 'og:image', content: metadata.imageUrl });
    }

    this.meta.updateTag({ property: 'og:title', content: metadata.title });
    if (metadata.description) {
      this.meta.updateTag({ property: 'og:description', content: metadata.description });
    }
  }
}
