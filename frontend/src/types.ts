export interface Paper {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  
  discussions: number;
  implementations: number;
  stars: number;
  
}

export interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export interface PaperCardProps {
  paper: Paper;
}

export interface PaperDetailProps {
  paper: Paper;
  onClose: () => void;
}

export interface MetricButtonProps {
  icon: React.ElementType;
  count: number;
  isStarred?: boolean;
}

export interface ContactInfo {
  email: string;
  phone: string;
  linkedin: string;
  country: string;
}

export interface OnboardingProps {
  onComplete: (data: {
    papers: Paper[];
    role: string;
    interests: string;
    organization: string;
    contactInfo: ContactInfo;
  }) => void;
}

export interface ChatInterfaceProps {
  researcherName: string;
  onClose: () => void;
}
