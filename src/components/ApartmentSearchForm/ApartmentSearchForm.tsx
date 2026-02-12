import React, { useState } from 'react';
import './ApartmentSearchForm.css';

interface ApartmentSearchFormData {
  location: string;
  squareMeters: number | null;
  rooms: number | null;
  budgetMin: number;
  budgetMax: number;
  purpose: string;
  preferences: string;
  dealbreakers: string;
  email: string;
  phone: string;
}

const SQUARE_METER_OPTIONS = [90, 88, 150, 200];
const ROOM_OPTIONS = [1, 2, 3, 4, 5, 6];

interface FormErrors {
  location?: string;
  preferences?: string;
  dealbreakers?: string;
  email?: string;
  phone?: string;
}

const LETTERS_ONLY_REGEX = /^[a-zA-Z\u0590-\u05FF\s,.'"-]*$/;
const NUMBERS_ONLY_REGEX = /^[0-9]*$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ApartmentSearchForm: React.FC = () => {
  const [formData, setFormData] = useState<ApartmentSearchFormData>({
    location: '',
    squareMeters: null,
    rooms: null,
    budgetMin: 200000,
    budgetMax: 5000000,
    purpose: 'מגורים',
    preferences: '',
    dealbreakers: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    field: keyof ApartmentSearchFormData,
    value: string | number | null
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLettersOnly = (
    field: 'location' | 'preferences' | 'dealbreakers',
    value: string
  ) => {
    if (LETTERS_ONLY_REGEX.test(value)) {
      handleChange(field, value);
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: 'ניתן להזין אותיות בלבד' }));
    }
  };

  const handlePhoneChange = (value: string) => {
    if (NUMBERS_ONLY_REGEX.test(value)) {
      handleChange('phone', value);
      setErrors((prev) => ({ ...prev, phone: undefined }));
    } else {
      setErrors((prev) => ({ ...prev, phone: 'ניתן להזין מספרים בלבד' }));
    }
  };

  const handleEmailChange = (value: string) => {
    handleChange('email', value);
    if (value && !EMAIL_REGEX.test(value)) {
      setErrors((prev) => ({ ...prev, email: 'כתובת אימייל לא תקינה' }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const formatCurrency = (value: number) =>
    `$ ${value.toLocaleString('en-US')}`;

  return (
    <div className="apartment-form-wrapper" dir="rtl">
      <form
        className="apartment-form"
        onSubmit={handleSubmit}
        data-testid="apartment-search-form"
      >
        <h1 className="apartment-form__title">
          אנחנו נעזור לך
          <br />
          למצוא דירה!
        </h1>

        {/* Location */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">באיזה איזור ועיר?</label>
          <input
            type="text"
            className={`apartment-form__input ${errors.location ? 'apartment-form__input--error' : ''}`}
            placeholder="למשל: שמעון, ירושלים"
            value={formData.location}
            onChange={(e) => handleLettersOnly('location', e.target.value)}
            data-testid="location-input"
          />
          {errors.location && <span className="apartment-form__error" data-testid="location-error">{errors.location}</span>}
        </section>

        {/* Square Meters */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">כמה מ&quot;ר?</label>
          <div className="apartment-form__chips" data-testid="sqm-chips">
            {SQUARE_METER_OPTIONS.map((sqm) => (
              <button
                key={sqm}
                type="button"
                className={`apartment-form__chip ${
                  formData.squareMeters === sqm
                    ? 'apartment-form__chip--active'
                    : ''
                }`}
                onClick={() =>
                  handleChange(
                    'squareMeters',
                    formData.squareMeters === sqm ? null : sqm
                  )
                }
                data-testid={`sqm-chip-${sqm}`}
              >
                {sqm === 200 ? '+200' : sqm}
              </button>
            ))}
          </div>
        </section>

        {/* Rooms */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">כמה חדרים?</label>
          <div className="apartment-form__chips" data-testid="rooms-chips">
            {ROOM_OPTIONS.map((room) => (
              <button
                key={room}
                type="button"
                className={`apartment-form__chip ${
                  formData.rooms === room
                    ? 'apartment-form__chip--active'
                    : ''
                }`}
                onClick={() =>
                  handleChange(
                    'rooms',
                    formData.rooms === room ? null : room
                  )
                }
                data-testid={`room-chip-${room}`}
              >
                {room === 6 ? '+6' : room}
              </button>
            ))}
          </div>
        </section>

        {/* Budget */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">מה התקציב שלך?</label>
          <div className="apartment-form__budget">
            <span className="apartment-form__budget-label">
              {formatCurrency(formData.budgetMax)} - {formatCurrency(formData.budgetMin)}
            </span>
            <input
              type="range"
              className="apartment-form__range"
              min={200000}
              max={5000000}
              step={50000}
              value={formData.budgetMax}
              onChange={(e) =>
                handleChange('budgetMax', Number(e.target.value))
              }
              data-testid="budget-slider"
            />
          </div>
        </section>

        {/* Purpose */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">לאיזו מטרה:</label>
          <div className="apartment-form__select-wrapper">
            <select
              className="apartment-form__select"
              value={formData.purpose}
              onChange={(e) => handleChange('purpose', e.target.value)}
              data-testid="purpose-select"
            >
              <option value="מגורים">מגורים</option>
              <option value="השקעה">השקעה</option>
              <option value="השכרה">השכרה</option>
            </select>
          </div>
        </section>

        {/* Preferences */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">מה העדפות שלך?</label>
          <textarea
            className={`apartment-form__textarea ${errors.preferences ? 'apartment-form__textarea--error' : ''}`}
            placeholder="פרטו לנו כאן"
            value={formData.preferences}
            onChange={(e) => handleLettersOnly('preferences', e.target.value)}
            data-testid="preferences-textarea"
          />
          {errors.preferences && <span className="apartment-form__error" data-testid="preferences-error">{errors.preferences}</span>}
        </section>

        {/* Dealbreakers */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">על מה לא תוותרו:</label>
          <textarea
            className={`apartment-form__textarea ${errors.dealbreakers ? 'apartment-form__textarea--error' : ''}`}
            placeholder="פרטו לנו כאן"
            value={formData.dealbreakers}
            onChange={(e) => handleLettersOnly('dealbreakers', e.target.value)}
            data-testid="dealbreakers-textarea"
          />
          {errors.dealbreakers && <span className="apartment-form__error" data-testid="dealbreakers-error">{errors.dealbreakers}</span>}
        </section>

        {/* Contact */}
        <section className="apartment-form__section">
          <label className="apartment-form__label">
            איך לשלוח לך הודעות? במייל / בווצאפ
          </label>
          <div className="apartment-form__contact-row">
            <div className="apartment-form__input-group">
              <input
                type="tel"
                className={`apartment-form__input apartment-form__input--half ${errors.phone ? 'apartment-form__input--error' : ''}`}
                placeholder="מספר הנייד"
                value={formData.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                data-testid="phone-input"
              />
              {errors.phone && <span className="apartment-form__error" data-testid="phone-error">{errors.phone}</span>}
            </div>
            <div className="apartment-form__input-group">
              <input
                type="email"
                className={`apartment-form__input apartment-form__input--half ${errors.email ? 'apartment-form__input--error' : ''}`}
                placeholder="המייל שלך"
                value={formData.email}
                onChange={(e) => handleEmailChange(e.target.value)}
                data-testid="email-input"
              />
              {errors.email && <span className="apartment-form__error" data-testid="email-error">{errors.email}</span>}
            </div>
          </div>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="apartment-form__submit"
          data-testid="submit-button"
        >
          קדימה, שלחו לי &larr;
        </button>

        {/* WhatsApp CTA */}
        <div className="apartment-form__whatsapp-cta">
          <p className="apartment-form__whatsapp-text">
            רוצה להצטרף לקבוצת ווטסאפ סטורה
            <br />
            למחפשי ובעלי נכסים בישראל?
          </p>
          <button
            type="button"
            className="apartment-form__whatsapp-btn"
            data-testid="whatsapp-button"
          >
            <WhatsAppIcon />
            מעניין אותי
          </button>
        </div>
      </form>
    </div>
  );
};

const WhatsAppIcon: React.FC = () => (
  <svg
    className="apartment-form__whatsapp-icon"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default ApartmentSearchForm;
