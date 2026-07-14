// ================= MOCK COMPONENT STATE DATA =================
let sessionUser = null;
let currentAuthMode = 'LOGIN'; 

let mockInternships = [
    { id: 1, role: 'Java Developer Intern', company: 'XYZ Systems', location: 'remote', skills: 'Java, Spring Boot, MySQL', stipend: '$500/mo' },
    { id: 2, role: 'Frontend Engineer Intern', company: 'PixelCraft Studio', location: 'onsite', skills: 'React, Tailwind CSS, JavaScript', stipend: '$600/mo' },
    { id: 3, role: 'Full Stack Assistant', company: 'DevFlow Labs', location: 'remote', skills: 'Java, Node.js, React, MongoDB', stipend: '$450/mo' }
];

let mockApplicants = [
    { id: 101, name: 'Rahul Kumar', role: 'Java Developer Intern', skillsMatch: '92%', resumeFile: 'Rahul_CSE_Resume.pdf', status: 'APPLIED' },
    { id: 102, name: 'Ananya Sharma', role: 'Frontend Engineer Intern', skillsMatch: '88%', resumeFile: 'Ananya_WebDev_CV.pdf', status: 'SHORTLISTED' },
    { id: 103, name: 'Vikram Singh', role: 'Java Developer Intern', skillsMatch: '64%', resumeFile: 'Vikram_System_Resume.pdf', status: 'APPLIED' }
];

let mockRecommendations = [
    { role: 'Backend Developer Intern', company: 'TechCorp Solutions', match: '94%', reason: 'Matches your registered core skills: Java, Spring Boot, and MySQL.' },
    { role: 'Data Analyst Intern', company: 'FinData Inc.', match: '87%', reason: 'Aligned with your profile keywords: Python and SQL.' }
];

let mockStudentApplications = [
    { company: 'XYZ Systems', role: 'Java Developer Intern', date: '2026-06-15', status: 'APPLIED' },
    { company: 'MetaCore Corp', role: 'Python Research Intern', date: '2026-06-10', status: 'SHORTLISTED' },
    { company: 'Legacy Bank Tech', role: 'Database Analyst', date: '2026-06-02', status: 'REJECTED' }
];

// ================= ENTRY INTERFACE ACCOUNT SECURITY METHODS =================
function toggleAuthMode() {
    currentAuthMode = (currentAuthMode === 'LOGIN') ? 'REGISTER' : 'LOGIN';
    
    document.getElementById('auth-title').innerText = (currentAuthMode === 'LOGIN') ? 'Welcome Back' : 'Create Portal Account';
    document.getElementById('auth-subtitle').innerText = (currentAuthMode === 'LOGIN') ? 'Please select your role and enter your credentials to log in.' : 'Fill out the form below to set up your profile.';
    document.getElementById('auth-submit-btn').innerText = (currentAuthMode === 'LOGIN') ? 'Sign In' : 'Register';
    document.getElementById('auth-toggle-msg').innerText = (currentAuthMode === 'LOGIN') ? 'New to the platform?' : 'Already have an account?';
    document.getElementById('auth-toggle-link').innerText = (currentAuthMode === 'LOGIN') ? 'Sign in here' : 'Create an account';
    
    toggleRegFields();
}

function toggleRegFields() {
    const regFields = document.getElementById('reg-fields');
    const studentFields = document.getElementById('student-only-fields');
    const selectedRole = document.getElementById('auth-role').value;

    if (currentAuthMode === 'REGISTER') {
        regFields.classList.remove('hidden');
        if (selectedRole === 'STUDENT') {
            studentFields.classList.remove('hidden');
        } else {
            studentFields.classList.add('hidden');
        }
    } else {
        regFields.classList.add('hidden');
    }
}

// Intercept Submit Gateway Action
document.getElementById('auth-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const role = document.getElementById('auth-role').value;
    const email = document.getElementById('auth-email').value;
    const fallbackName = email.split('@')[0]; 
    const registeredName = document.getElementById('reg-name').value || fallbackName;

    sessionUser = {
        name: registeredName.toUpperCase(),
        role: role,
        email: email
    };

    initializePortalSession();
});

// ================= WORKSPACE INITIALIZATION AND ROUTING =================
function initializePortalSession() {
    document.getElementById('auth-container').classList.add('hidden');
    document.getElementById('app-workspace').classList.remove('hidden');

    document.getElementById('badge-name').innerText = sessionUser.name;
    document.getElementById('badge-role').innerText = sessionUser.role.charAt(0) + sessionUser.role.slice(1).toLowerCase();

    document.getElementById('student-links').classList.add('hidden');
    document.getElementById('recruiter-links').classList.add('hidden');
    document.getElementById('admin-links').classList.add('hidden');

    if (sessionUser.role === 'STUDENT') {
        document.getElementById('student-links').classList.remove('hidden');
        switchTab('student-dashboard');
        loadStudentDashboard();
    } else if (sessionUser.role === 'RECRUITER') {
        document.getElementById('recruiter-links').classList.remove('hidden');
        switchTab('company-dashboard');
        loadRecruiterDashboard();
    } else if (sessionUser.role === 'ADMIN') {
        document.getElementById('admin-links').classList.remove('hidden');
        switchTab('admin-dashboard');
    }
}

function processLogout() {
    sessionUser = null;
    document.getElementById('auth-form').reset();
    currentAuthMode = 'REGISTER'; 
    toggleAuthMode(); 
    document.getElementById('app-workspace').classList.add('hidden');
    document.getElementById('auth-container').classList.remove('hidden');
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-view').forEach(view => view.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(`${tabName}-view`).classList.add('active');
    
    const activeBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => btn.getAttribute('onclick').includes(tabName));
    if (activeBtn) activeBtn.classList.add('active');
}

// ================= STUDENT PIPELINE FUNCTIONS =================
function loadStudentDashboard() {
    document.getElementById('dash-applied-count').innerText = mockStudentApplications.length;
    const container = document.getElementById('ai-recommendations-container');
    
    container.innerHTML = mockRecommendations.map(item => {
        return `
            <div class="rec-card">
                <span class="match-badge">${item.match} Match</span>
                <h3>${item.role}</h3>
                <p style="color: var(--primary-blue); margin-bottom: 16px;">${item.company}</p>
                <div class="reason-box"><strong>Why recommended:</strong> ${item.reason}</div>
                <button class="btn-primary" style="width: 100%; margin-top: 10px;" onclick="triggerQuickApply('${item.role}', '${item.company}')">Quick Apply</button>
            </div>
        `;
    }).join('');

    loadInternshipsGrid(mockInternships);
    loadStudentTrackingTable();
}

function loadInternshipsGrid(data) {
    const grid = document.getElementById('internships-grid');
    grid.innerHTML = data.map(job => {
        return `
            <div class="job-card">
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                        <h3 style="margin: 0;">${job.role}</h3>
                        <span style="font-size: 0.85rem; background: #e2e8f0; padding: 6px 14px; border-radius: 6px; font-weight: 700; text-transform: uppercase; color: var(--text-main);">${job.location}</span>
                    </div>
                    <p style="color: var(--primary-blue); font-weight: 700; font-size: 1.25rem; margin-bottom: 24px;">${job.company}</p>
                    <p class="term-header-label">Skills Required</p>
                    <p class="term-value-text">${job.skills}</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 20px; margin-top: 16px;">
                    <div>
                        <p class="stipend-title-label">Stipend</p>
                        <p class="stipend-value-text">${job.stipend}</p>
                    </div>
                    <button class="btn-primary" onclick="triggerQuickApply('${job.role}', '${job.company}')">Apply Now</button>
                </div>
            </div>
        `;
    }).join('');
}

function filterInternships() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const locationFilter = document.getElementById('location-select').value;
    const filtered = mockInternships.filter(job => {
        const matchSearch = job.role.toLowerCase().includes(query) || job.skills.toLowerCase().includes(query) || job.company.toLowerCase().includes(query);
        const matchLocation = locationFilter === 'all' || job.location === locationFilter;
        return matchSearch && matchLocation;
    });
    loadInternshipsGrid(filtered);
}

function loadStudentTrackingTable() {
    const tbody = document.getElementById('tracking-table-body');
    tbody.innerHTML = mockStudentApplications.map(app => {
        return `
            <tr>
                <td><strong>${app.company}</strong></td>
                <td>${app.role}</td>
                <td style="color: var(--text-muted);">${app.date}</td>
                <td><span class="status-badge status-${app.status.toLowerCase()}">${app.status}</span></td>
            </tr>
        `;
    }).join('');
}

function triggerQuickApply(role, company) {
    const newApp = { company: company, role: role, date: new Date().toISOString().split('T')[0], status: 'APPLIED' };
    mockStudentApplications.unshift(newApp);
    
    mockApplicants.unshift({ id: Date.now(), name: sessionUser.name, role: role, skillsMatch: '95%', resumeFile: 'Uploaded_Resume.pdf', status: 'APPLIED' });
    
    alert(`Application submitted successfully for the ${role} position at ${company}!`);
    loadStudentDashboard();
}

// AI PDF Document Parser Delays Simulated Match Updates
document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('analyze-btn');
    btn.innerText = "Analyzing Resume Structure...";
    btn.disabled = true;

    setTimeout(() => {
        btn.innerText = "Analyze Resume";
        btn.disabled = false;
        document.getElementById('analysis-report').classList.remove('hidden');
        document.getElementById('resume-score').innerText = "82%";
        document.getElementById('suggestion-text').innerText = "Consider highlighting your cloud architecture skills (like AWS or Azure) and containerization tools (like Docker) inside your active project descriptions to boost matching positions.";
        document.getElementById('found-skills-tags').innerHTML = ['Java', 'Spring Boot', 'SQL', 'Git', 'REST APIs'].map(s => `<span class="tag">${s}</span>`).join('');
        document.getElementById('missing-skills-tags').innerHTML = ['AWS Cloud', 'Docker', 'Microservices'].map(s => `<span class="tag">${s}</span>`).join('');
    }, 1200);
});

// ================= RECRUITER OPERATION PIPELINES =================
function loadRecruiterDashboard() {
    document.getElementById('active-jobs-count').innerText = mockInternships.length;
    document.getElementById('recruiter-total-apps').innerText = mockApplicants.length;
    document.getElementById('recruiter-shortlist-count').innerText = mockApplicants.filter(a => a.status === 'SHORTLISTED').length;
    
    const tbody = document.getElementById('applicants-table-body');
    tbody.innerHTML = mockApplicants.map(student => {
        return `
            <tr id="applicant-row-${student.id}">
                <td><strong>${student.name}</strong></td>
                <td>${student.role}</td>
                <td><span style="background-color: #f5f3ff; color: #6d28d9; padding: 6px 12px; border-radius: 6px; font-weight: 700; font-size: 0.95rem;">${student.skillsMatch} Match</span></td>
                <td><a href="#" style="color: var(--primary-blue); font-weight: 600; text-decoration: none;">📄 ${student.resumeFile}</a></td>
                <td>
                    ${student.status === 'APPLIED' ? `
                        <button class="btn-action btn-shortlist" onclick="processPipelineAction(${student.id}, 'SHORTLISTED')">Shortlist</button>
                        <button class="btn-action btn-reject" onclick="processPipelineAction(${student.id}, 'REJECTED')">Reject</button>
                    ` : `<span class="status-badge status-${student.status.toLowerCase()}">${student.status}</span>`}
                </td>
            </tr>
        `;
    }).join('');
}

function processPipelineAction(id, resolution) {
    const match = mockApplicants.find(a => a.id === id);
    if (match) {
        match.status = resolution;
        loadRecruiterDashboard();
    }
}

document.getElementById('post-job-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const newJob = {
        id: mockInternships.length + 1,
        role: document.getElementById('job-title').value,
        company: sessionUser.name,
        location: document.getElementById('job-location').value,
        skills: document.getElementById('job-skills').value,
        stipend: document.getElementById('job-stipend').value
    };
    mockInternships.unshift(newJob);
    alert('Internship opportunity successfully posted!');
    this.reset();
    loadRecruiterDashboard();
    switchTab('company-dashboard');
});