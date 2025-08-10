'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">oauassess documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminModule.html" data-type="entity-link" >AdminModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' :
                                            'id="xs-controllers-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' }>
                                            <li class="link">
                                                <a href="controllers/AdminController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' :
                                        'id="xs-injectables-links-module-AdminModule-894a1909cd242aa41966ca9456ede697c5fc9787ce38f0f4021a1338057c22d8dc24f282956b588a52ebd7f5c3fd94540be22e6d91c39b428dbc518c2b00e0a1"' }>
                                        <li class="link">
                                            <a href="injectables/AdminService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' : 'data-bs-target="#xs-controllers-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' :
                                            'id="xs-controllers-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' : 'data-bs-target="#xs-injectables-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' :
                                        'id="xs-injectables-links-module-AppModule-af0fb0c7b0ff6cefb3e142865b074057a23d90faedd69db8f1f5c7cbab70c13079480617be4ff2d60c38b5550c9872182aa772455de41a4031949767a4e0e0ce"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamModule.html" data-type="entity-link" >ExamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' : 'data-bs-target="#xs-controllers-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' :
                                            'id="xs-controllers-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' }>
                                            <li class="link">
                                                <a href="controllers/ExamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' : 'data-bs-target="#xs-injectables-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' :
                                        'id="xs-injectables-links-module-ExamModule-bedf5322c24aaa44f95a6921b33bd930cbf4447422064759a40b4a85631d032e40aefca3515848806c1cfdcdc764f865c9983ea5f70ad051a137822ed0b93f66"' }>
                                        <li class="link">
                                            <a href="injectables/CreateExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateExamProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FetchExamAssignmentsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FetchExamAssignmentsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateMcqExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateMcqExamProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateOeExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateOeExamProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentModule.html" data-type="entity-link" >StudentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' : 'data-bs-target="#xs-controllers-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' :
                                            'id="xs-controllers-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' }>
                                            <li class="link">
                                                <a href="controllers/StudentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' : 'data-bs-target="#xs-injectables-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' :
                                        'id="xs-injectables-links-module-StudentModule-c8959e67c1dd5f371a6e9d1f4eec192d90b141d12621658e6b96600fda2a297213c91068502507f0fe1fd556f34d7f511002e1951944e34b495a856e5dce2088"' }>
                                        <li class="link">
                                            <a href="injectables/InsertStudentProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InsertStudentProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StudentService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminController.html" data-type="entity-link" >AdminController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/ExamController.html" data-type="entity-link" >ExamController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/StudentController.html" data-type="entity-link" >StudentController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Admin.html" data-type="entity-link" >Admin</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateAdminDto.html" data-type="entity-link" >CreateAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExamAssignmentDto.html" data-type="entity-link" >CreateExamAssignmentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateExamDto.html" data-type="entity-link" >CreateExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Exam.html" data-type="entity-link" >Exam</a>
                            </li>
                            <li class="link">
                                <a href="classes/ExamAssignment.html" data-type="entity-link" >ExamAssignment</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenerateTokenProvider.html" data-type="entity-link" >GenerateTokenProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalHttpExceptionFilter.html" data-type="entity-link" >GlobalHttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginStudentDto.html" data-type="entity-link" >LoginStudentDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Mcq.html" data-type="entity-link" >Mcq</a>
                            </li>
                            <li class="link">
                                <a href="classes/McqQuestion.html" data-type="entity-link" >McqQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/OeQuestion.html" data-type="entity-link" >OeQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link" >Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateExamParamDto.html" data-type="entity-link" >UpdateExamParamDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminService.html" data-type="entity-link" >AdminService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateExamProvider.html" data-type="entity-link" >CreateExamProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExamService.html" data-type="entity-link" >ExamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchExamAssignmentsProvider.html" data-type="entity-link" >FetchExamAssignmentsProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InsertStudentProvider.html" data-type="entity-link" >InsertStudentProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StudentService.html" data-type="entity-link" >StudentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateMcqExamProvider.html" data-type="entity-link" >UpdateMcqExamProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateOeExamProvider.html" data-type="entity-link" >UpdateOeExamProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AccessTokenGuard.html" data-type="entity-link" >AccessTokenGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/AuthenticationGuard.html" data-type="entity-link" >AuthenticationGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ActiveAdminData.html" data-type="entity-link" >ActiveAdminData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IMcqQuestion.html" data-type="entity-link" >IMcqQuestion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IOeQuestion.html" data-type="entity-link" >IOeQuestion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResponse.html" data-type="entity-link" >IResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IStudent.html" data-type="entity-link" >IStudent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});