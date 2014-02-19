'use strict';

describe('Directive: pwFeatureToggle', function () {

    // load the app module
    beforeEach(module('pwFeatureToggle'));

    var scope,
        $httpBackend,
        $compile,
        featureToggle;

    beforeEach(inject(function ($rootScope, _$httpBackend_, _$compile_, _featureToggle_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;
        $compile = _$compile_;

        // Expect GET request and intercept it
        $httpBackend.expectGET('data/features.json').respond([
            {
                "key": "feature1",
                "enabled": true
            },
            {
                "key": "feature2",
                "enabled": true
            },
            {
                "key": "feature3",
                "enabled": false
            },
            {
                "key": "image",
                "enabled": true
            }
        ]);

        $httpBackend.flush();
        featureToggle = _featureToggle_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should remove a disabled feature', function () {
        // Compile a piece of HTML containing the directive
        var container = angular.element('<div><div pw-feature-toggle="feature3">Feature 3</div></div>');
        $compile(container)(scope);
        // fire all the watches
        scope.$digest();
        expect(container.children().length).toBe(0);
    });


    it('should keep an enabled feature', function () {
        // Compile a piece of HTML containing the directive
        var container = angular.element('<div><div pw-feature-toggle="feature1">Feature 1</div></div>');
        $compile(container)(scope);
        // fire all the watches
        scope.$digest();
        expect(container.children().length).toBe(1);
    });
});

