import YALM from 'yaml';
import LocaleType from './locale.type';

class Locale {
  private locale: string;
  private translation: LocaleType | undefined;
  constructor (locale: string) {
    this.locale = locale;
  }
  
  async getTranslation(): Promise<LocaleType> {
    await this._fetchTranslations();
    if (this.translation === undefined) {
      throw new Error('Translation not found');
    }

    return this.translation;
  }

  private async _fetchTranslations(): Promise<void> {
    const fetchTranslations = await fetch(`/locales/${this.locale}.yml`);
    if (fetchTranslations.ok) {
      const text = await fetchTranslations.text();
      this.translation = YALM.parse(text) as LocaleType;
      return;
    }

    throw new Error(`Locale ${this.locale} not found`);
  }
}

export default Locale;