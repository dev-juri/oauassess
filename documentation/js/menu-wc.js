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
                                            'data-bs-target="#controllers-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' : 'data-bs-target="#xs-controllers-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' :
                                            'id="xs-controllers-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' }>
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
                                        'data-bs-target="#injectables-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' : 'data-bs-target="#xs-injectables-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' :
                                        'id="xs-injectables-links-module-AdminModule-44605a13b8cfddf2cb1bb92e9ece166f9b8c3066d8ac849a5988305d8d3fb9f264a2a8752da7eed04b5ab322011a393d2b5c45a82fdb1b0621cbd7094994c7ef"' }>
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
                                            'data-bs-target="#controllers-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' : 'data-bs-target="#xs-controllers-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' :
                                            'id="xs-controllers-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' : 'data-bs-target="#xs-injectables-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' :
                                        'id="xs-injectables-links-module-AppModule-a6f72b308f88750c6339e01def8058650da52b057733e2a2f7abbb5e92c81b6827a152deac12377f7a6009e23ecfe531eec0874e225b688a7184f1e0d4bd34e9"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CacheModule.html" data-type="entity-link" >CacheModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-CacheModule-4560d078e3dde5cdc4a54660b328f19e1b57ac7be7e089d0b5f724b0414cadd0d92a74985be5827c51db103745856d9f8c05bbab48a8e4d7118bad0ee3b8b064"' : 'data-bs-target="#xs-injectables-links-module-CacheModule-4560d078e3dde5cdc4a54660b328f19e1b57ac7be7e089d0b5f724b0414cadd0d92a74985be5827c51db103745856d9f8c05bbab48a8e4d7118bad0ee3b8b064"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CacheModule-4560d078e3dde5cdc4a54660b328f19e1b57ac7be7e089d0b5f724b0414cadd0d92a74985be5827c51db103745856d9f8c05bbab48a8e4d7118bad0ee3b8b064"' :
                                        'id="xs-injectables-links-module-CacheModule-4560d078e3dde5cdc4a54660b328f19e1b57ac7be7e089d0b5f724b0414cadd0d92a74985be5827c51db103745856d9f8c05bbab48a8e4d7118bad0ee3b8b064"' }>
                                        <li class="link">
                                            <a href="injectables/CacheService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CacheService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ExamModule.html" data-type="entity-link" >ExamModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' : 'data-bs-target="#xs-controllers-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' :
                                            'id="xs-controllers-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' }>
                                            <li class="link">
                                                <a href="controllers/ExamController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' : 'data-bs-target="#xs-injectables-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' :
                                        'id="xs-injectables-links-module-ExamModule-5d1e389e96f10e7b8c3956a6b74b9be040ebb5b513c322e0aa2dd4b03ba0d913d05241a4c28f21eedfab2e033873d80e8fdf66f3b89a261df652fc08c8a7e128"' }>
                                        <li class="link">
                                            <a href="injectables/CreateExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateExamProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamReportProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamReportProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ExamService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ExamService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FetchExamAssignmentsProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FetchExamAssignmentsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/GradeOeExamProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GradeOeExamProvider</a>
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
                                <a href="modules/OpenaiModule.html" data-type="entity-link" >OpenaiModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-OpenaiModule-5d83dfdaeff46af174262c502e915ab9aef160a298e548f946076ff06f5ad8839886b669df87809f2b64bf23262ffe975cc9be72bf2bc2b2277d75234d6dc6fc"' : 'data-bs-target="#xs-injectables-links-module-OpenaiModule-5d83dfdaeff46af174262c502e915ab9aef160a298e548f946076ff06f5ad8839886b669df87809f2b64bf23262ffe975cc9be72bf2bc2b2277d75234d6dc6fc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OpenaiModule-5d83dfdaeff46af174262c502e915ab9aef160a298e548f946076ff06f5ad8839886b669df87809f2b64bf23262ffe975cc9be72bf2bc2b2277d75234d6dc6fc"' :
                                        'id="xs-injectables-links-module-OpenaiModule-5d83dfdaeff46af174262c502e915ab9aef160a298e548f946076ff06f5ad8839886b669df87809f2b64bf23262ffe975cc9be72bf2bc2b2277d75234d6dc6fc"' }>
                                        <li class="link">
                                            <a href="injectables/OpenaiService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenaiService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StudentModule.html" data-type="entity-link" >StudentModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' : 'data-bs-target="#xs-controllers-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' :
                                            'id="xs-controllers-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' }>
                                            <li class="link">
                                                <a href="controllers/StudentController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StudentController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' : 'data-bs-target="#xs-injectables-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' :
                                        'id="xs-injectables-links-module-StudentModule-b85dddb518f557cacf760ad6de174511de06a958f071cdcaa0a7be7da8d2e9b30555363229d5b298479206775d3775f53b4b1783d0f9092b779792f1cdbce044"' }>
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
                                <a href="classes/FetchQuestionParamsDto.html" data-type="entity-link" >FetchQuestionParamsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GenerateTokenProvider.html" data-type="entity-link" >GenerateTokenProvider</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalHttpExceptionFilter.html" data-type="entity-link" >GlobalHttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GradeOeExamDto.html" data-type="entity-link" >GradeOeExamDto</a>
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
                                <a href="classes/OeExamGrading.html" data-type="entity-link" >OeExamGrading</a>
                            </li>
                            <li class="link">
                                <a href="classes/OeQuestion.html" data-type="entity-link" >OeQuestion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Student.html" data-type="entity-link" >Student</a>
                            </li>
                            <li class="link">
                                <a href="classes/StudentAnswerDto.html" data-type="entity-link" >StudentAnswerDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitMcqExamDto.html" data-type="entity-link" >SubmitMcqExamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SubmitOeExamDto.html" data-type="entity-link" >SubmitOeExamDto</a>
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
                                    <a href="injectables/CacheService.html" data-type="entity-link" >CacheService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateExamProvider.html" data-type="entity-link" >CreateExamProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExamReportProvider.html" data-type="entity-link" >ExamReportProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExamService.html" data-type="entity-link" >ExamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FetchExamAssignmentsProvider.html" data-type="entity-link" >FetchExamAssignmentsProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GradeOeExamProvider.html" data-type="entity-link" >GradeOeExamProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InsertStudentProvider.html" data-type="entity-link" >InsertStudentProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/OpenaiService.html" data-type="entity-link" >OpenaiService</a>
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
                                <a href="interfaces/GradingRequest.html" data-type="entity-link" >GradingRequest</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GradingResult.html" data-type="entity-link" >GradingResult</a>
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
                            <li class="link">
                                <a href="interfaces/McqQuestionCache.html" data-type="entity-link" >McqQuestionCache</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OeQuestionCache.html" data-type="entity-link" >OeQuestionCache</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/OpenaiApiResponse.html" data-type="entity-link" >OpenaiApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/QuestionResponse.html" data-type="entity-link" >QuestionResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StudentResponseData.html" data-type="entity-link" >StudentResponseData</a>
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