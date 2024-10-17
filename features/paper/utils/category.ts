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
  "astro-ph": { subject: "Astrophysics", description: "Astrophysics" },
  "astro-ph.CO": {
    subject: "Astrophysics",
    description: "Cosmology and Nongalactic Astrophysics",
  },
  "astro-ph.EP": {
    subject: "Astrophysics",
    description: "Earth and Planetary Astrophysics",
  },
  "astro-ph.GA": {
    subject: "Astrophysics",
    description: "Astrophysics of Galaxies",
  },
  "astro-ph.HE": {
    subject: "Astrophysics",
    description: "High Energy Astrophysical Phenomena",
  },
  "astro-ph.IM": {
    subject: "Astrophysics",
    description: "Instrumentation and Methods for Astrophysics",
  },
  "astro-ph.SR": {
    subject: "Astrophysics",
    description: "Solar and Stellar Astrophysics",
  },
  "cond-mat.dis-nn": {
    subject: "Condensed Matter",
    description: "Disordered Systems and Neural Networks",
  },
  "cond-mat.mes-hall": {
    subject: "Condensed Matter",
    description: "Mesoscale and Nanoscale Physics",
  },
  "cond-mat.mtrl-sci": {
    subject: "Condensed Matter",
    description: "Materials Science",
  },
  "cond-mat.other": {
    subject: "Condensed Matter",
    description: "Other Condensed Matter",
  },
  "cond-mat.quant-gas": {
    subject: "Condensed Matter",
    description: "Quantum Gases",
  },
  "cond-mat.soft": {
    subject: "Condensed Matter",
    description: "Soft Condensed Matter",
  },
  "cond-mat.stat-mech": {
    subject: "Condensed Matter",
    description: "Statistical Mechanics",
  },
  "cond-mat.str-el": {
    subject: "Condensed Matter",
    description: "Strongly Correlated Electrons",
  },
  "cond-mat.supr-con": {
    subject: "Condensed Matter",
    description: "Superconductivity",
  },
  "gr-qc": {
    subject: "General Relativity and Quantum Cosmology",
    description: "General Relativity and Quantum Cosmology",
  },
  "hep-ex": {
    subject: "High Energy Physics",
    description: "High Energy Physics - Experiment",
  },
  "hep-lat": {
    subject: "High Energy Physics",
    description: "High Energy Physics - Lattice",
  },
  "hep-ph": {
    subject: "High Energy Physics",
    description: "High Energy Physics - Phenomenology",
  },
  "hep-th": {
    subject: "High Energy Physics",
    description: "High Energy Physics - Theory",
  },
  "math-ph": {
    subject: "Mathematical Physics",
    description: "Mathematical Physics",
  },
  "nucl-ex": {
    subject: "Nuclear Experiment",
    description: "Nuclear Experiment",
  },
  "nucl-th": { subject: "Nuclear Theory", description: "Nuclear Theory" },
  "physics.acc-ph": { subject: "Physics", description: "Accelerator Physics" },
  "physics.app-ph": { subject: "Physics", description: "Applied Physics" },
  "physics.ao-ph": {
    subject: "Physics",
    description: "Atmospheric and Oceanic Physics",
  },
  "physics.atom-ph": { subject: "Physics", description: "Atomic Physics" },
  "physics.atm-clus": {
    subject: "Physics",
    description: "Atomic and Molecular Clusters",
  },
  "physics.bio-ph": { subject: "Physics", description: "Biological Physics" },
  "physics.chem-ph": { subject: "Physics", description: "Chemical Physics" },
  "physics.class-ph": { subject: "Physics", description: "Classical Physics" },
  "physics.comp-ph": {
    subject: "Physics",
    description: "Computational Physics",
  },
  "physics.data-an": {
    subject: "Physics",
    description: "Data Analysis, Statistics and Probability",
  },
  "physics.flu-dyn": { subject: "Physics", description: "Fluid Dynamics" },
  "physics.gen-ph": { subject: "Physics", description: "General Physics" },
  "physics.geo-ph": { subject: "Physics", description: "Geophysics" },
  "physics.hist-ph": {
    subject: "Physics",
    description: "History and Philosophy of Physics",
  },
  "physics.ins-det": {
    subject: "Physics",
    description: "Instrumentation and Detectors",
  },
  "physics.med-ph": { subject: "Physics", description: "Medical Physics" },
  "physics.optics": { subject: "Physics", description: "Optics" },
  "physics.ed-ph": { subject: "Physics", description: "Physics Education" },
  "physics.soc-ph": { subject: "Physics", description: "Physics and Society" },
  "physics.plasm-ph": { subject: "Physics", description: "Plasma Physics" },
  "physics.pop-ph": { subject: "Physics", description: "Popular Physics" },
  "physics.space-ph": { subject: "Physics", description: "Space Physics" },
  "quant-ph": { subject: "Quantum Physics", description: "Quantum Physics" },
  "math.AG": { subject: "Mathematics", description: "Algebraic Geometry" },
  "math.AT": { subject: "Mathematics", description: "Algebraic Topology" },
  "math.AP": { subject: "Mathematics", description: "Analysis of PDEs" },
  "math.CT": { subject: "Mathematics", description: "Category Theory" },
  "math.CA": {
    subject: "Mathematics",
    description: "Classical Analysis and ODEs",
  },
  "math.CO": { subject: "Mathematics", description: "Combinatorics" },
  "math.AC": { subject: "Mathematics", description: "Commutative Algebra" },
  "math.CV": { subject: "Mathematics", description: "Complex Variables" },
  "math.DG": { subject: "Mathematics", description: "Differential Geometry" },
  "math.DS": { subject: "Mathematics", description: "Dynamical Systems" },
  "math.FA": { subject: "Mathematics", description: "Functional Analysis" },
  "math.GM": { subject: "Mathematics", description: "General Mathematics" },
  "math.GT": { subject: "Mathematics", description: "Geometric Topology" },
  "math.GR": { subject: "Mathematics", description: "Group Theory" },
  "math.HO": { subject: "Mathematics", description: "History and Overview" },
  "math.IT": { subject: "Mathematics", description: "Information Theory" },
  "math.KT": { subject: "Mathematics", description: "K-Theory and Homology" },
  "math.LO": { subject: "Mathematics", description: "Logic" },
  "math.MG": { subject: "Mathematics", description: "Metric Geometry" },
  "math.NT": { subject: "Mathematics", description: "Number Theory" },
  "math.NA": { subject: "Mathematics", description: "Numerical Analysis" },
  "math.OA": { subject: "Mathematics", description: "Operator Algebras" },
  "math.OC": {
    subject: "Mathematics",
    description: "Optimization and Control",
  },
  "math.PR": { subject: "Mathematics", description: "Probability" },
  "math.QA": { subject: "Mathematics", description: "Quantum Algebra" },
  "math.RT": { subject: "Mathematics", description: "Representation Theory" },
  "math.RA": { subject: "Mathematics", description: "Rings and Algebras" },
  "math.SP": { subject: "Mathematics", description: "Spectral Theory" },
  "math.ST": { subject: "Mathematics", description: "Statistics Theory" },
  "math.SG": { subject: "Mathematics", description: "Symplectic Geometry" },
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
  "q-bio.BM": { subject: "Quantitative Biology", description: "Biomolecules" },
  "q-bio.CB": { subject: "Quantitative Biology", description: "Cell Behavior" },
  "q-bio.GN": { subject: "Quantitative Biology", description: "Genomics" },
  "q-bio.MN": {
    subject: "Quantitative Biology",
    description: "Molecular Networks",
  },
  "q-bio.NC": {
    subject: "Quantitative Biology",
    description: "Neurons and Cognition",
  },
  "q-bio.PE": {
    subject: "Quantitative Biology",
    description: "Populations and Evolution",
  },
  "q-bio.QM": {
    subject: "Quantitative Biology",
    description: "Quantitative Methods",
  },
  "q-bio.SC": {
    subject: "Quantitative Biology",
    description: "Subcellular Processes",
  },
  "q-bio.TO": {
    subject: "Quantitative Biology",
    description: "Tissues and Organs",
  },
  "q-fin.CP": {
    subject: "Quantitative Finance",
    description: "Computational Finance",
  },
  "q-fin.EC": { subject: "Quantitative Finance", description: "Economics" },
  "q-fin.GN": {
    subject: "Quantitative Finance",
    description: "General Finance",
  },
  "q-fin.MF": {
    subject: "Quantitative Finance",
    description: "Mathematical Finance",
  },
  "q-fin.PM": {
    subject: "Quantitative Finance",
    description: "Portfolio Management",
  },
  "q-fin.PR": {
    subject: "Quantitative Finance",
    description: "Pricing of Securities",
  },
  "q-fin.RM": {
    subject: "Quantitative Finance",
    description: "Risk Management",
  },
  "q-fin.ST": {
    subject: "Quantitative Finance",
    description: "Statistical Finance",
  },
  "q-fin.TR": {
    subject: "Quantitative Finance",
    description: "Trading and Market Microstructure",
  },
  "stat.AP": { subject: "Statistics", description: "Applications" },
  "stat.CO": { subject: "Statistics", description: "Computation" },
  "stat.ML": { subject: "Statistics", description: "Machine Learning" },
  "stat.ME": { subject: "Statistics", description: "Methodology" },
  "stat.OT": { subject: "Statistics", description: "Other Statistics" },
  "stat.TH": { subject: "Statistics", description: "Statistics Theory" },
  "eess.AS": {
    subject: "Electrical Engineering and Systems Science",
    description: "Audio and Speech Processing",
  },
  "eess.IV": {
    subject: "Electrical Engineering and Systems Science",
    description: "Image and Video Processing",
  },
  "eess.SP": {
    subject: "Electrical Engineering and Systems Science",
    description: "Signal Processing",
  },
  "eess.SY": {
    subject: "Electrical Engineering and Systems Science",
    description: "Systems and Control",
  },
  "econ.EM": { subject: "Economics", description: "Econometrics" },
  "econ.GN": { subject: "Economics", description: "General Economics" },
  "econ.TH": { subject: "Economics", description: "Theoretical Economics" },
};

/** Subject 기반 인덱싱 */
export const Subject: Subject = {
  Astrophysics: {
    "astro-ph": "Astrophysics",
    "astro-ph.CO": "Cosmology and Nongalactic Astrophysics",
    "astro-ph.EP": "Earth and Planetary Astrophysics",
    "astro-ph.GA": "Astrophysics of Galaxies",
    "astro-ph.HE": "High Energy Astrophysical Phenomena",
    "astro-ph.IM": "Instrumentation and Methods for Astrophysics",
    "astro-ph.SR": "Solar and Stellar Astrophysics",
  },
  "Condensed Matter": {
    "cond-mat.dis-nn": "Disordered Systems and Neural Networks",
    "cond-mat.mes-hall": "Mesoscale and Nanoscale Physics",
    "cond-mat.mtrl-sci": "Materials Science",
    "cond-mat.other": "Other Condensed Matter",
    "cond-mat.quant-gas": "Quantum Gases",
    "cond-mat.soft": "Soft Condensed Matter",
    "cond-mat.stat-mech": "Statistical Mechanics",
    "cond-mat.str-el": "Strongly Correlated Electrons",
    "cond-mat.supr-con": "Superconductivity",
  },
  "General Relativity and Quantum Cosmology": {
    "gr-qc": "General Relativity and Quantum Cosmology",
  },
  "High Energy Physics": {
    "hep-ex": "High Energy Physics - Experiment",
    "hep-lat": "High Energy Physics - Lattice",
    "hep-ph": "High Energy Physics - Phenomenology",
    "hep-th": "High Energy Physics - Theory",
  },
  "Mathematical Physics": {
    "math-ph": "Mathematical Physics",
  },
  "Nuclear Experiment": {
    "nucl-ex": "Nuclear Experiment",
  },
  "Nuclear Theory": {
    "nucl-th": "Nuclear Theory",
  },
  Physics: {
    "physics.acc-ph": "Accelerator Physics",
    "physics.app-ph": "Applied Physics",
    "physics.ao-ph": "Atmospheric and Oceanic Physics",
    "physics.atom-ph": "Atomic Physics",
    "physics.atm-clus": "Atomic and Molecular Clusters",
    "physics.bio-ph": "Biological Physics",
    "physics.chem-ph": "Chemical Physics",
    "physics.class-ph": "Classical Physics",
    "physics.comp-ph": "Computational Physics",
    "physics.data-an": "Data Analysis, Statistics and Probability",
    "physics.flu-dyn": "Fluid Dynamics",
    "physics.gen-ph": "General Physics",
    "physics.geo-ph": "Geophysics",
    "physics.hist-ph": "History and Philosophy of Physics",
    "physics.ins-det": "Instrumentation and Detectors",
    "physics.med-ph": "Medical Physics",
    "physics.optics": "Optics",
    "physics.ed-ph": "Physics Education",
    "physics.soc-ph": "Physics and Society",
    "physics.plasm-ph": "Plasma Physics",
    "physics.pop-ph": "Popular Physics",
    "physics.space-ph": "Space Physics",
  },
  "Quantum Physics": {
    "quant-ph": "Quantum Physics",
  },
  Mathematics: {
    "math.AG": "Algebraic Geometry",
    "math.AT": "Algebraic Topology",
    "math.AP": "Analysis of PDEs",
    "math.CT": "Category Theory",
    "math.CA": "Classical Analysis and ODEs",
    "math.CO": "Combinatorics",
    "math.AC": "Commutative Algebra",
    "math.CV": "Complex Variables",
    "math.DG": "Differential Geometry",
    "math.DS": "Dynamical Systems",
    "math.FA": "Functional Analysis",
    "math.GM": "General Mathematics",
    "math.GT": "Geometric Topology",
    "math.GR": "Group Theory",
    "math.HO": "History and Overview",
    "math.IT": "Information Theory",
    "math.KT": "K-Theory and Homology",
    "math.LO": "Logic",
    "math.MG": "Metric Geometry",
    "math.NT": "Number Theory",
    "math.NA": "Numerical Analysis",
    "math.OA": "Operator Algebras",
    "math.OC": "Optimization and Control",
    "math.PR": "Probability",
    "math.QA": "Quantum Algebra",
    "math.RT": "Representation Theory",
    "math.RA": "Rings and Algebras",
    "math.SP": "Spectral Theory",
    "math.ST": "Statistics Theory",
    "math.SG": "Symplectic Geometry",
  },
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
  "Quantitative Biology": {
    "q-bio.BM": "Biomolecules",
    "q-bio.CB": "Cell Behavior",
    "q-bio.GN": "Genomics",
    "q-bio.MN": "Molecular Networks",
    "q-bio.NC": "Neurons and Cognition",
    "q-bio.PE": "Populations and Evolution",
    "q-bio.QM": "Quantitative Methods",
    "q-bio.SC": "Subcellular Processes",
    "q-bio.TO": "Tissues and Organs",
  },
  "Quantitative Finance": {
    "q-fin.CP": "Computational Finance",
    "q-fin.EC": "Economics",
    "q-fin.GN": "General Finance",
    "q-fin.MF": "Mathematical Finance",
    "q-fin.PM": "Portfolio Management",
    "q-fin.PR": "Pricing of Securities",
    "q-fin.RM": "Risk Management",
    "q-fin.ST": "Statistical Finance",
    "q-fin.TR": "Trading and Market Microstructure",
  },
  Statistics: {
    "stat.AP": "Applications",
    "stat.CO": "Computation",
    "stat.ML": "Machine Learning",
    "stat.ME": "Methodology",
    "stat.OT": "Other Statistics",
    "stat.TH": "Statistics Theory",
  },
  "Electrical Engineering and Systems Science": {
    "eess.AS": "Audio and Speech Processing",
    "eess.IV": "Image and Video Processing",
    "eess.SP": "Signal Processing",
    "eess.SY": "Systems and Control",
  },
  Economics: {
    "econ.EM": "Econometrics",
    "econ.GN": "General Economics",
    "econ.TH": "Theoretical Economics",
  },
};