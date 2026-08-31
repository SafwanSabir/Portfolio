import UseContext from '../Context'
import { useContext } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import resumefile from '../assets/resume.png'
import '../css/ResumeFile.css'
import '@react95/core/themes/win95.css';
import { Checkbox, Fieldset, ProgressBar, Tab, Tabs } from '@react95/core';

function ResumeFile() {
  const { 
    themeDragBar,
    ResumeFileExpand, setResumeFileExpand,
    lastTapTime, setLastTapTime,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

  function handleDragStop(event, data) {
    const positionX = data.x 
    const positionY = data.y
    setResumeFileExpand(prev => ({
      ...prev, x: positionX, y: positionY
    }))
  }

  function handleExpandStateToggle() {
    setResumeFileExpand(prevState => ({
      ...prevState, expand: !prevState.expand
    }));
  }

  function handleExpandStateToggleMobile() {
    const now = Date.now();
    if (now - lastTapTime < 300) {
        setResumeFileExpand(prevState => ({
            ...prevState, expand: !prevState.expand
        }));
    }
    setLastTapTime(now);
  }

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar-resumefile'}
        grid={[1, 1]}
        scale={1}
        disabled={ResumeFileExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 5 : 80,
          y: window.innerWidth <= 500 ? 100 : 90,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('ResumeFile')}
      >
        <div className='folder_folder-resumefile' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('ResumeFile');
            }}
            style={ ResumeFileExpand.expand ? inlineStyleExpand('ResumeFile') : inlineStyle('ResumeFile')}>
          <div className="folder_dragbar-resumefile"
              onDoubleClick={handleExpandStateToggle}
              onTouchStart={handleExpandStateToggleMobile}
             style={{ background: ResumeFileExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="folder_barname-resumefile">
              <img src={resumefile} alt="resumefile" />
              <span>About me</span>
            </div>
            <div className="folder_barbtn-resumefile">
              <div onClick={ !isTouchDevice? (e) => {
                e.stopPropagation()
                setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('ResumeFile') 
              } : undefined }
                   onTouchEnd={(e) => {
                    e.stopPropagation()
                    setResumeFileExpand(prev => ({...prev, hide: true, focusItem: false}))
                    StyleHide('ResumeFile')
                  }}
                  onTouchStart={(e) => e.stopPropagation()}
              >
                <p className='dash-resumefile'></p>
              </div>
              <div
                onClick={ !isTouchDevice ? () => handleExpandStateToggle() : undefined}
                onTouchEnd={handleExpandStateToggle}
              >
                <motion.div className={`expand-resumefile ${ResumeFileExpand.expand ? 'full' : ''}`}>
                </motion.div>
                {ResumeFileExpand.expand ? <div className="expand_2-resumefile"></div> : null}
              </div>
              <div>
                <p className='x-resumefile'
                 onClick={!isTouchDevice ? () => {
                  deleteTap('ResumeFile')
                 }: undefined}
                onTouchEnd={() => {
                  deleteTap('ResumeFile')
              }}
                >×</p>
              </div>
            </div>
          </div>

          <div className="folder_content-resumefile react95-wrapper"
            style={ResumeFileExpand.expand ? { height: 'calc(100svh - 72px)'} : {}}
          >
            {ResumeFileExpand.show && (
              <Tabs defaultActiveTab="Genesis">
                <Tab title="Genesis">
                  <h3>Behold, I am Safwan Sabir</h3>
                  <p>A Full-Stack Engineer Architecting the Digital Frontier</p>
                  <Fieldset legend="My Saga">
                    <p>
                      I am a creator of worlds, a weaver of code, and a solver of complex digital puzzles. With over 2 years traversing the realms of AI/ML systems, cloud infrastructure, and production web platforms, I forge elegant, high-performance software. I command multi-agent LLM pipelines, RAG architectures, and multi-tenant AWS infrastructure. My quest is to apply full-stack and AI engineering skills to scale production systems to legendary heights.
                    </p>
                  </Fieldset>
                  <br/>
                  <Fieldset legend="Academic Origins">
                    <p><strong>University of Central Punjab</strong> - Lahore, Pakistan</p>
                    <p>Bachelor of Science in Computer Science</p>
                  </Fieldset>
                </Tab>

                <Tab title="Chronicles">
                  <Fieldset legend="Devsinc - The Cloud Vanguard (Mar 2026 - Present)">
                    <Checkbox readOnly checked>
                      Associate Software Engineer: Containerized model inference services with Docker, deploying to AWS to maintain reproducible environments. Built automated model evaluation scripts using Pandas and NumPy, generating precision and latency reports for 5+ deployed models.
                    </Checkbox>
                    <br/>
                    <Checkbox readOnly checked>
                      Trainee Associate: Built scalable ETL pipelines using PySpark and Databricks, reducing data preparation time by 30%. Fine-tuned transformer models on domain-specific data using PyTorch.
                    </Checkbox>
                    <br/>
                    <Checkbox readOnly checked>
                      AI Intern: Developed a full-stack ML pipeline integrating GPT language models with FastAPI.
                    </Checkbox>
                  </Fieldset>
                  <br/>
                  <Fieldset legend="UmrahXpress - The Marketplace Forger (Feb 2025 - Dec 2025)">
                    <Checkbox readOnly checked>
                      Full-Stack Developer: Architected a B2B hotel price-comparison platform aggregating live rates across 4 external APIs using FastAPI. Designed a custom deduplication engine using GPS matching and PostGIS. Implemented role-based access control and a booking synchronization cron system.
                    </Checkbox>
                    <br/>
                    <Checkbox readOnly checked>
                      Junior Developer: Contributed frontend features for the public landing site using React and Next.js.
                    </Checkbox>
                  </Fieldset>
                  <br/>
                  <Fieldset legend="Hashtag Marketing - The Creative Scribe (Feb 2022 - Mar 2023)">
                    <Checkbox readOnly checked>
                      Graphic Designer: Designed social media marketing creatives and produced motion content across diverse sectors using Adobe Creative Suite.
                    </Checkbox>
                  </Fieldset>
                </Tab>

                <Tab title="Arsenal">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    <Fieldset legend="Core Languages & Frameworks">
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="resume-skills">Python</li>
                        <ProgressBar percent={95} width="200px" />
                        <li className="resume-skills">TypeScript / JavaScript</li>
                        <ProgressBar percent={90} width="200px" />
                        <li className="resume-skills">React.js & Next.js</li>
                        <ProgressBar percent={92} width="200px" />
                        <li className="resume-skills">FastAPI</li>
                        <ProgressBar percent={88} width="200px" />
                        <li className="resume-skills">SQL</li>
                        <ProgressBar percent={85} width="200px" />
                      </ul>
                    </Fieldset>
                    <Fieldset legend="AI & Machine Learning">
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="resume-skills">LLM & RAG Integration</li>
                        <ProgressBar percent={95} width="200px" />
                        <li className="resume-skills">Multi-Agent Systems (LangGraph)</li>
                        <ProgressBar percent={90} width="200px" />
                        <li className="resume-skills">PyTorch & Hugging Face</li>
                        <ProgressBar percent={85} width="200px" />
                        <li className="resume-skills">Pandas & NumPy</li>
                        <ProgressBar percent={88} width="200px" />
                      </ul>
                    </Fieldset>
                    <Fieldset legend="Cloud & Infrastructure">
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li className="resume-skills">AWS (EKS, RDS, WAF)</li>
                        <ProgressBar percent={90} width="200px" />
                        <li className="resume-skills">Docker & Kubernetes</li>
                        <ProgressBar percent={88} width="200px" />
                        <li className="resume-skills">Terraform</li>
                        <ProgressBar percent={85} width="200px" />
                        <li className="resume-skills">CI/CD & GitHub Actions</li>
                        <ProgressBar percent={92} width="200px" />
                      </ul>
                    </Fieldset>
                  </div>
                </Tab>

                <Tab title="Soul">
                  <Fieldset legend="Core Attributes">
                    <p>
                      I am a relentless problem-solver, a collaborative spirit, and a lifelong learner. My passion for technology is matched only by my dedication to creating meaningful and impactful digital experiences. I thrive in dynamic environments where I can push the boundaries of what's possible, whether I am provisioning multi-tenant AWS infrastructure with Terraform, engineering deterministic RAG pipelines, or architecting multi-agent AI clinical training systems.
                    </p>
                  </Fieldset>
                  <br/>
                  <Fieldset legend="Legendary Projects">
                    <Checkbox readOnly checked>
                      <strong>THOR AI Platform:</strong> Provisioned production AWS infrastructure, deployed RDS PostgreSQL and ElastiCache, and built zero-static-credentials CI/CD pipelines.
                    </Checkbox>
                    <br/>
                    <Checkbox readOnly checked>
                      <strong>VITAL - Virtual Training:</strong> Architected a multi-agent AI clinical training system using LangGraph and FastAPI with an immersive 3D WebGL interface (Three.js). Engineered deterministic RAG pipelines to mitigate hallucination risk.
                    </Checkbox>
                  </Fieldset>
                </Tab>
              </Tabs>
            )}
          </div>
        </div>
      </Draggable>
    </>
  )
}

export default ResumeFile
