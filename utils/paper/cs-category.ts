export type Subject = {
  [subject: string]: { [category: string]: string };
};

export type Category = {
  [categoryID: string]: {
    subject: string;
    description: string;
  };
};

/** Category 기반 인덱싱 */
export const Category: Category = {
  "cs.AI": {
    subject: "Computer Science",
    description: "Artificial Intelligence",
  },
  "cs.CL": {
    subject: "Computer Science",
    description: "Computation and Language",
  },
  "cs.CC": {
    subject: "Computer Science",
    description: "Computational Complexity",
  },
  "cs.CE": {
    subject: "Computer Science",
    description: "Computational Engineering, Finance, and Science",
  },
  "cs.CG": {
    subject: "Computer Science",
    description: "Computational Geometry",
  },
  "cs.CV": {
    subject: "Computer Science",
    description: "Computer Vision and Pattern Recognition",
  },
  "cs.CY": {
    subject: "Computer Science",
    description: "Computers and Society",
  },
  "cs.CR": {
    subject: "Computer Science",
    description: "Cryptography and Security",
  },
  "cs.DS": {
    subject: "Computer Science",
    description: "Data Structures and Algorithms",
  },
  "cs.DB": { subject: "Computer Science", description: "Databases" },
  "cs.DL": { subject: "Computer Science", description: "Digital Libraries" },
  "cs.DM": { subject: "Computer Science", description: "Discrete Mathematics" },
  "cs.DC": {
    subject: "Computer Science",
    description: "Distributed, Parallel, and Cluster Computing",
  },
  "cs.ET": {
    subject: "Computer Science",
    description: "Emerging Technologies",
  },
  "cs.FL": {
    subject: "Computer Science",
    description: "Formal Languages and Automata Theory",
  },
  "cs.GL": { subject: "Computer Science", description: "General Literature" },
  "cs.GR": { subject: "Computer Science", description: "Graphics" },
  "cs.AR": {
    subject: "Computer Science",
    description: "Hardware Architecture",
  },
  "cs.HC": {
    subject: "Computer Science",
    description: "Human-Computer Interaction",
  },
  "cs.IR": {
    subject: "Computer Science",
    description: "Information Retrieval",
  },
  "cs.IT": { subject: "Computer Science", description: "Information Theory" },
  "cs.LG": { subject: "Computer Science", description: "Machine Learning" },
  "cs.LO": {
    subject: "Computer Science",
    description: "Logic in Computer Science",
  },
  "cs.MS": {
    subject: "Computer Science",
    description: "Mathematical Software",
  },
  "cs.MA": { subject: "Computer Science", description: "Multiagent Systems" },
  "cs.MM": { subject: "Computer Science", description: "Multimedia" },
  "cs.NI": {
    subject: "Computer Science",
    description: "Networking and Internet Architecture",
  },
  "cs.NE": {
    subject: "Computer Science",
    description: "Neural and Evolutionary Computing",
  },
  "cs.OS": { subject: "Computer Science", description: "Operating Systems" },
  "cs.OH": {
    subject: "Computer Science",
    description: "Other Computer Science",
  },
  "cs.PF": { subject: "Computer Science", description: "Performance" },
  "cs.PL": {
    subject: "Computer Science",
    description: "Programming Languages",
  },
  "cs.RO": { subject: "Computer Science", description: "Robotics" },
  "cs.SI": {
    subject: "Computer Science",
    description: "Social and Information Networks",
  },
  "cs.SE": { subject: "Computer Science", description: "Software Engineering" },
  "cs.SD": { subject: "Computer Science", description: "Sound" },
  "cs.SC": { subject: "Computer Science", description: "Symbolic Computation" },
  "cs.SY": { subject: "Computer Science", description: "Systems and Control" },
};

/** Subject 기반 인덱싱 */
export const Subject: Subject = {
  "Computer Science": {
    "cs.AI": "Artificial Intelligence",
    "cs.CL": "Computation and Language",
    "cs.CC": "Computational Complexity",
    "cs.CE": "Computational Engineering, Finance, and Science",
    "cs.CG": "Computational Geometry",
    "cs.CV": "Computer Vision and Pattern Recognition",
    "cs.CY": "Computers and Society",
    "cs.CR": "Cryptography and Security",
    "cs.DS": "Data Structures and Algorithms",
    "cs.DB": "Databases",
    "cs.DL": "Digital Libraries",
    "cs.DM": "Discrete Mathematics",
    "cs.DC": "Distributed, Parallel, and Cluster Computing",
    "cs.ET": "Emerging Technologies",
    "cs.FL": "Formal Languages and Automata Theory",
    "cs.GL": "General Literature",
    "cs.GR": "Graphics",
    "cs.AR": "Hardware Architecture",
    "cs.HC": "Human-Computer Interaction",
    "cs.IR": "Information Retrieval",
    "cs.IT": "Information Theory",
    "cs.LG": "Machine Learning",
    "cs.LO": "Logic in Computer Science",
    "cs.MS": "Mathematical Software",
    "cs.MA": "Multiagent Systems",
    "cs.MM": "Multimedia",
    "cs.NI": "Networking and Internet Architecture",
    "cs.NE": "Neural and Evolutionary Computing",
    "cs.OS": "Operating Systems",
    "cs.OH": "Other Computer Science",
    "cs.PF": "Performance",
    "cs.PL": "Programming Languages",
    "cs.RO": "Robotics",
    "cs.SI": "Social and Information Networks",
    "cs.SE": "Software Engineering",
    "cs.SD": "Sound",
    "cs.SC": "Symbolic Computation",
    "cs.SY": "Systems and Control",
  },
};
