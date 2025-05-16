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
                    <a href="index.html" data-type="index-link">examigpt documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' : 'data-bs-target="#xs-controllers-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' :
                                            'id="xs-controllers-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' : 'data-bs-target="#xs-injectables-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' :
                                        'id="xs-injectables-links-module-AppModule-f805376bf2eb2651cc21521879ea6d06b4dfc4948a7376b433e8ba4be7a35e40f78849c75dc467e4794590ebc196c4e32c0aa6bc08d34c28c2d0bacfc2858f09"' }>
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
                                            'data-bs-target="#controllers-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' : 'data-bs-target="#xs-controllers-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' :
                                            'id="xs-controllers-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' }>
                                            <li class="link">
                                                <a href="controllers/ExamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' : 'data-bs-target="#xs-injectables-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' :
                                        'id="xs-injectables-links-module-ExamModule-0ebffb20eaff5dfe328e2a87a2bd3deee4d87a30b092b95f452e69349ac2ef196eb361ab7cd73eb3b4c456451ab70eaf715a7dec68ef68f3e71529ccfbb6ee5f"' }>
                                        <li class="link">
                                            <a href="injectables/CreateExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateExamProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UpdateMcqExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UpdateMcqExamProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentModule.html" data-type="entity-link" >StudentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' : 'data-bs-target="#xs-controllers-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' :
                                            'id="xs-controllers-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' }>
                                            <li class="link">
                                                <a href="controllers/StudentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' : 'data-bs-target="#xs-injectables-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' :
                                        'id="xs-injectables-links-module-StudentModule-29932fcfb99b1215d24ba3e9c3887e114fb4b0ee761159f56771b31ed104726cfb4fe6ae16681ec74c913c1d6f91a48b81f4377576bb96bbe173de4bb7e277c9"' }>
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
                                <a href="classes/Mcq.html" data-type="entity-link" >Mcq</a>
                            </li>
                            <li class="link">
                                <a href="classes/McqExam.html" data-type="entity-link" >McqExam</a>
                            </li>
                            <li class="link">
                                <a href="classes/McqQuestion.html" data-type="entity-link" >McqQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link" >Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateMcqExamParamDto.html" data-type="entity-link" >UpdateMcqExamParamDto</a>
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
                                    <a href="injectables/StudentService.html" data-type="entity-link" >StudentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UpdateMcqExamProvider.html" data-type="entity-link" >UpdateMcqExamProvider</a>
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