'use strict';

describe('Service: featureToggle', function () {

    // load the app module
    beforeEach(module('pwFeatureToggle'));

    var scope,
        $httpBackend,
        featureToggle;

    beforeEach(inject(function ($rootScope, _$httpBackend_, _featureToggle_) {
        scope = $rootScope.$new();
        $httpBackend = _$httpBackend_;

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

        featureToggle = _featureToggle_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should return true when hasBeenLoaded is called after finishing loading the data', function () {
        expect(featureToggle.hasBeenLoaded()).toBe(false);
        $httpBackend.flush();
        expect(featureToggle.hasBeenLoaded()).toBe(true);
    });

//    it('should call load when the data is not loaded and there is an attempt to check if a feature is enabled',
//        function () {
//
//            var load = spyOn(featureToggle, 'load').andCallThrough();
//            featureToggle.isEnabled('feature1');
//            $httpBackend.flush();
//            //expect(featureToggle.hasBeenLoaded()).toBe(false);
//            expect(load).toHaveBeenCalled();
//        });

    it('should correctly check for enabled features', function () {
        $httpBackend.flush();
        expect(featureToggle.isEnabled('feature1')).toBe(true);
        expect(featureToggle.isEnabled('feature2')).toBe(true);
        expect(featureToggle.isEnabled('feature3')).toBe(false);
        expect(featureToggle.isEnabled('image')).toBe(true);
    });

    it('should return false for checks to the enabling of non existing features', function () {
        $httpBackend.flush();
        expect(featureToggle.isEnabled('featureX')).toBe(false);
    });


});

