import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { MdEmail, MdPhone, MdLocationOn, MdLink } from 'react-icons/md';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useResume } from '../contexts/ResumeContext';

const LivePreview = forwardRef((props, ref) => {
  const { resumeData } = useResume();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const ContactItem = ({ icon: Icon, text, link }) => {
    if (!text) return null;
    
    const content = (
      <div className="flex items-center space-x-2 text-gray-600 text-sm">
        <Icon className="text-blue-600 flex-shrink-0" />
        <span className="break-all">{text}</span>
      </div>
    );

    return link ? (
      <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
        {content}
      </a>
    ) : content;
  };

  const Section = ({ title, children, className = "" }) => {
    if (!children || (Array.isArray(children) && children.length === 0)) return null;
    
    return (
      <div className={`mb-8 ${className}`}>
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2 mb-4">
          {title}
        </h2>
        {children}
      </div>
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-2xl rounded-xl overflow-hidden print:shadow-none print:rounded-none min-h-full"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 print:p-6 min-h-full" id="resume-content">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b border-gray-200">
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            {resumeData.personalInfo.name || 'Your Name'}
          </motion.h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <ContactItem 
              icon={MdEmail} 
              text={resumeData.personalInfo.email}
              link={resumeData.personalInfo.email ? `mailto:${resumeData.personalInfo.email}` : null}
            />
            <ContactItem 
              icon={MdPhone} 
              text={resumeData.personalInfo.phone}
              link={resumeData.personalInfo.phone ? `tel:${resumeData.personalInfo.phone}` : null}
            />
            <ContactItem 
              icon={MdLocationOn} 
              text={resumeData.personalInfo.location}
            />
            <ContactItem 
              icon={FaLinkedin} 
              text={resumeData.personalInfo.linkedin}
              link={resumeData.personalInfo.linkedin ? `https://${resumeData.personalInfo.linkedin}` : null}
            />
            <ContactItem 
              icon={FaGithub} 
              text={resumeData.personalInfo.github}
              link={resumeData.personalInfo.github ? `https://${resumeData.personalInfo.github}` : null}
            />
          </div>
        </div>

        {/* Professional Summary */}
        <Section title="Professional Summary">
          {resumeData.summary && (
            <p className="text-gray-700 leading-relaxed text-justify">
              {resumeData.summary}
            </p>
          )}
        </Section>

        {/* Work Experience */}
        <Section title="Work Experience">
          <div className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-6 border-l-2 border-blue-200"
              >
                <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-2 top-0"></div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.role || 'Job Title'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-gray-600 text-sm">
                    <span className="font-medium">{exp.company || 'Company Name'}</span>
                    {exp.location && (
                      <>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </>
                    )}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {exp.description}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-start"
              >
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree || 'Degree'}
                  </h3>
                  <div className="text-gray-600 text-sm">
                    {edu.school || 'School Name'}
                    {edu.location && ` • ${edu.location}`}
                  </div>
                  {edu.gpa && (
                    <div className="text-gray-500 text-sm">GPA: {edu.gpa}</div>
                  )}
                </div>
                <div className="text-gray-500 text-sm text-right">
                  {formatDate(edu.graduationDate)}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          {resumeData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          )}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-2 border-blue-200 pl-4"
              >
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">
                    {project.title || 'Project Title'}
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <MdLink className="text-sm" />
                    </a>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {project.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Empty State */}
        {!resumeData.personalInfo.name && !resumeData.summary && 
         resumeData.experience.length === 0 && resumeData.education.length === 0 && 
         resumeData.skills.length === 0 && resumeData.projects.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-6xl">📄</div>
              <h3 className="text-xl font-medium">Start Building Your Resume</h3>
              <p className="text-gray-400">
                Fill out the form on the left to see your resume come to life!
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
});

LivePreview.displayName = 'LivePreview';

export default LivePreview;