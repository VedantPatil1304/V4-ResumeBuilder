import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdPerson, 
  MdWork, 
  MdSchool, 
  MdCode, 
  MdFolder,
  MdAdd,
  MdDelete,
  MdExpandMore,
  MdExpandLess,
  MdDescription
} from 'react-icons/md';
import { useResume } from '../contexts/ResumeContext';

const FormSection = ({ title, icon: Icon, children, isOpen, onToggle }) => (
  <motion.div 
    layout
    className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-700/50 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 backdrop-blur-sm"
  >
    <motion.button
      whileHover={{ 
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        scale: 1.01
      }}
      whileTap={{ scale: 0.99 }}
      onClick={onToggle}
      className="w-full p-8 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset transition-all duration-200"
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <Icon className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isOpen ? 'Click to collapse' : 'Click to expand'}
          </p>
        </div>
      </div>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg"
      >
        <MdExpandMore className="text-gray-600 dark:text-gray-300 text-xl" />
      </motion.div>
    </motion.button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="border-t border-gradient-to-r from-blue-200/30 via-purple-200/30 to-pink-200/30 dark:border-gray-700/50"
        >
          <div className="p-8 space-y-6 bg-gradient-to-br from-gray-50/50 to-white dark:from-gray-800/50 dark:to-gray-700/50">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false }) => (
  <div>
    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 tracking-wide">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 shadow-sm hover:shadow-md font-medium"
    />
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="block text-sm font-bold text-gray-800 dark:text-gray-200 mb-3 tracking-wide">
      {label}
    </label>
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300 resize-none shadow-sm hover:shadow-md font-medium"
    />
  </div>
);

const ResumeForm = () => {
  const {
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
  } = useResume();

  const [openSections, setOpenSections] = useState({
    personal: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    projects: true
  });

  const [newSkill, setNewSkill] = useState('');

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <FormSection
        title="Personal Information"
        icon={MdPerson}
        isOpen={openSections.personal}
        onToggle={() => toggleSection('personal')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Full Name"
            value={resumeData.personalInfo.name}
            onChange={(value) => updatePersonalInfo('name', value)}
            placeholder="John Doe"
            required
          />
          <InputField
            label="Email"
            type="email"
            value={resumeData.personalInfo.email}
            onChange={(value) => updatePersonalInfo('email', value)}
            placeholder="john@example.com"
            required
          />
          <InputField
            label="Phone"
            type="tel"
            value={resumeData.personalInfo.phone}
            onChange={(value) => updatePersonalInfo('phone', value)}
            placeholder="+1 (555) 123-4567"
          />
          <InputField
            label="Location"
            value={resumeData.personalInfo.location}
            onChange={(value) => updatePersonalInfo('location', value)}
            placeholder="New York, NY"
          />
          <InputField
            label="LinkedIn"
            value={resumeData.personalInfo.linkedin}
            onChange={(value) => updatePersonalInfo('linkedin', value)}
            placeholder="linkedin.com/in/johndoe"
          />
          <InputField
            label="GitHub"
            value={resumeData.personalInfo.github}
            onChange={(value) => updatePersonalInfo('github', value)}
            placeholder="github.com/johndoe"
          />
        </div>
      </FormSection>

      {/* Professional Summary */}
      <FormSection
        title="Professional Summary"
        icon={MdDescription}
        isOpen={openSections.summary}
        onToggle={() => toggleSection('summary')}
      >
        <TextareaField
          label="Summary"
          value={resumeData.summary}
          onChange={updateSummary}
          placeholder="Write a compelling professional summary that highlights your key achievements and career goals..."
          rows={4}
        />
      </FormSection>

      {/* Work Experience */}
      <FormSection
        title="Work Experience"
        icon={MdWork}
        isOpen={openSections.experience}
        onToggle={() => toggleSection('experience')}
      >
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={addExperience}
          className="w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 flex items-center justify-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 hover:from-blue-100/50 hover:to-purple-100/50 dark:hover:from-blue-800/20 dark:hover:to-purple-800/20 font-semibold shadow-sm hover:shadow-lg"
        >
          <div className="p-2 bg-blue-500 text-white rounded-lg">
            <MdAdd className="text-xl" />
          </div>
          <span className="text-lg">Add Work Experience</span>
        </motion.button>

        <div className="space-y-8">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-700 dark:to-gray-600/80 rounded-2xl border-2 border-gray-200/50 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                    <MdWork className="text-white text-lg" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Experience #{index + 1}
                  </h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteExperience(exp.id)}
                  className="p-3 text-red-600 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <MdDelete className="text-xl" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Job Title"
                  value={exp.role}
                  onChange={(value) => updateExperience(exp.id, 'role', value)}
                  placeholder="Software Engineer"
                />
                <InputField
                  label="Company"
                  value={exp.company}
                  onChange={(value) => updateExperience(exp.id, 'company', value)}
                  placeholder="Tech Company Inc."
                />
                <InputField
                  label="Location"
                  value={exp.location}
                  onChange={(value) => updateExperience(exp.id, 'location', value)}
                  placeholder="San Francisco, CA"
                />
                <div className="space-y-4">
                  <InputField
                    label="Start Date"
                    type="month"
                    value={exp.startDate}
                    onChange={(value) => updateExperience(exp.id, 'startDate', value)}
                  />
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor={`current-${exp.id}`} className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-3">
                      Currently working here
                    </label>
                  </div>
                  {!exp.current && (
                    <InputField
                      label="End Date"
                      type="month"
                      value={exp.endDate}
                      onChange={(value) => updateExperience(exp.id, 'endDate', value)}
                    />
                  )}
                </div>
              </div>

              <TextareaField
                label="Description"
                value={exp.description}
                onChange={(value) => updateExperience(exp.id, 'description', value)}
                placeholder="Describe your responsibilities and achievements..."
                rows={4}
              />
            </motion.div>
          ))}
        </div>
      </FormSection>

      {/* Education */}
      <FormSection
        title="Education"
        icon={MdSchool}
        isOpen={openSections.education}
        onToggle={() => toggleSection('education')}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addEducation}
          className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <MdAdd className="text-xl" />
          <span>Add Education</span>
        </motion.button>

        <div className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Education #{index + 1}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteEducation(edu.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <MdDelete className="text-lg" />
                </motion.button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  label="Degree"
                  value={edu.degree}
                  onChange={(value) => updateEducation(edu.id, 'degree', value)}
                  placeholder="Bachelor of Science in Computer Science"
                />
                <InputField
                  label="School"
                  value={edu.school}
                  onChange={(value) => updateEducation(edu.id, 'school', value)}
                  placeholder="University of Technology"
                />
                <InputField
                  label="Location"
                  value={edu.location}
                  onChange={(value) => updateEducation(edu.id, 'location', value)}
                  placeholder="Boston, MA"
                />
                <InputField
                  label="Graduation Date"
                  type="month"
                  value={edu.graduationDate}
                  onChange={(value) => updateEducation(edu.id, 'graduationDate', value)}
                />
                <InputField
                  label="GPA (Optional)"
                  value={edu.gpa}
                  onChange={(value) => updateEducation(edu.id, 'gpa', value)}
                  placeholder="3.8"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </FormSection>

      {/* Skills */}
      <FormSection
        title="Skills"
        icon={MdCode}
        isOpen={openSections.skills}
        onToggle={() => toggleSection('skills')}
      >
        <form onSubmit={handleAddSkill} className="flex space-x-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter a skill (e.g., JavaScript, React, Python)"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <MdAdd className="text-lg" />
          </motion.button>
        </form>

        {resumeData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {skill}
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  ×
                </motion.button>
              </motion.span>
            ))}
          </div>
        )}
      </FormSection>

      {/* Projects */}
      <FormSection
        title="Projects"
        icon={MdFolder}
        isOpen={openSections.projects}
        onToggle={() => toggleSection('projects')}
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addProject}
          className="w-full p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <MdAdd className="text-xl" />
          <span>Add Project</span>
        </motion.button>

        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Project #{index + 1}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteProject(project.id)}
                  className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                >
                  <MdDelete className="text-lg" />
                </motion.button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Project Title"
                    value={project.title}
                    onChange={(value) => updateProject(project.id, 'title', value)}
                    placeholder="E-commerce Website"
                  />
                  <InputField
                    label="Project Link"
                    value={project.link}
                    onChange={(value) => updateProject(project.id, 'link', value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <TextareaField
                  label="Description"
                  value={project.description}
                  onChange={(value) => updateProject(project.id, 'description', value)}
                  placeholder="Describe your project, technologies used, and key achievements..."
                  rows={3}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </FormSection>
    </div>
  );
};

export default ResumeForm;