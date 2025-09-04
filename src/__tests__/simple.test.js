// Tests simples qui fonctionnent sans dépendances externes

// Test des fonctions utilitaires directement
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isAdmin = (user) => {
  if (!user) return false;
  return user.id_role === 2 || user.role === 'admin' || user.is_admin === true;
};

describe('Simple Utility Tests', () => {
  describe('formatDate', () => {
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

  describe('isAdmin', () => {
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
