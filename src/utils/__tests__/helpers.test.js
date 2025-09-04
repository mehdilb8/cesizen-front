// Tests pour les fonctions utilitaires

describe('Utility Functions', () => {
  describe('formatDate', () => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    it('should format date correctly', () => {
      const result = formatDate('2024-01-15');
      expect(result).toMatch(/janvier 2024/);
    });

    it('should handle invalid date', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });
  });

  describe('validateEmail', () => {
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    it('should validate correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
    });

    it('should reject invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@domain.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('capitalizeFirst', () => {
    const capitalizeFirst = (str) => {
      if (!str) return '';
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    it('should capitalize first letter', () => {
      expect(capitalizeFirst('hello')).toBe('Hello');
      expect(capitalizeFirst('WORLD')).toBe('World');
      expect(capitalizeFirst('test')).toBe('Test');
    });

    it('should handle empty string', () => {
      expect(capitalizeFirst('')).toBe('');
      expect(capitalizeFirst(null)).toBe('');
      expect(capitalizeFirst(undefined)).toBe('');
    });
  });

  describe('truncateText', () => {
    const truncateText = (text, maxLength) => {
      if (!text || text.length <= maxLength) return text;
      return text.substring(0, maxLength) + '...';
    };

    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncateText(longText, 20);
      expect(result).toBe('This is a very long ...');
      expect(result.length).toBe(23);
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      const result = truncateText(shortText, 20);
      expect(result).toBe('Short text');
    });

    it('should handle empty text', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(null, 10)).toBe(null);
    });
  });

  describe('isAdmin', () => {
    const isAdmin = (user) => {
      if (!user) return false;
      return user.id_role === 2 || user.role === 'admin' || user.is_admin === true;
    };

    it('should identify admin by id_role', () => {
      const adminUser = { id: 1, nom: 'Admin', id_role: 2 };
      expect(isAdmin(adminUser)).toBe(true);
    });

    it('should identify admin by role', () => {
      const adminUser = { id: 1, nom: 'Admin', role: 'admin' };
      expect(isAdmin(adminUser)).toBe(true);
    });

    it('should identify admin by is_admin', () => {
      const adminUser = { id: 1, nom: 'Admin', is_admin: true };
      expect(isAdmin(adminUser)).toBe(true);
    });

    it('should not identify normal user as admin', () => {
      const normalUser = { id: 1, nom: 'User', id_role: 1 };
      expect(isAdmin(normalUser)).toBe(false);
    });

    it('should handle null user', () => {
      expect(isAdmin(null)).toBe(false);
      expect(isAdmin(undefined)).toBe(false);
    });
  });
});
