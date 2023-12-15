const EndPoint = {
    // Admin APIs
    AdminLogin: '/admin/login',
    AdminUserList: '/admin/list',
    AdminProfile: '/admin/profile',
    AdminUpdateProfile: '/admin/editProfile',
    AdminUpdateUser: '/admin/user/',
    AdminDeleteUser: '/admin/user/',
    AdminJobList: '/admin/job/list',
    AdminJobUpdate: '/admin/job/',
    AdminDeleteJob: '/admin/job/',

    // Seeker APIs
    SeekerLogin: '/seeker/login',
    SeekerRegister: '/seeker/register',
    SeekerProfile: '/seeker/profile',
    SeekerJobList: '/seeker/job/list',
    SeekerApply: '/seeker/application/apply',
    SeekerApplicationList: '/seeker/application/list',

    // Employer APIs
    EmployerLogin: '/employer/login',
    EmployerRegister: '/employer/register',
    EmployerProfile: '/employer/profile',
    EmployerJobList: '/employer/job/list',
    EmployerJobPost: '/employer/job/create',
    EmployerJobUpdate: '/employer/job/update',
    EmployerDeleteJob: '/employer/job/delete',
    EmployerJobDetail: '/employer/job/',
    EmployerApplicationList: '/employer/application/list',
};

export default EndPoint;