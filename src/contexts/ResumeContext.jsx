import React, { createContext, useContext, useEffect, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

const initialData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    location: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: []
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(resumeData));
  }, [resumeData]);

  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSummary = (summary) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now(),
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const deleteExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now(),
      degree: '',
      school: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const deleteEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addSkill = (skill) => {
    if (skill && !resumeData.skills.includes(skill)) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const removeSkill = (skill) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const addProject = () => {
    const newProject = {
      id: Date.now(),
      title: '',
      description: '',
      link: '',
      technologies: []
    };
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }));
  };

  const deleteProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updatePersonalInfo,
      updateSummary,
      addExperience,
      updateExperience,
      deleteExperience,
      addEducation,
      updateEducation,
      deleteEducation,
      addSkill,
      removeSkill,
      addProject,
      updateProject,
      deleteProject
    }}>
      {children}
    </ResumeContext.Provider>
  );
};