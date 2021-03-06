for N in [Float64, Rational{Int}, Float32]
    # normal constructor
    normal = ones(N, 3)
    hs = HalfSpace(normal, N(5.))

    # dimension
    @test dim(hs) == 3

    # support vector and membership function
    function test_svec(hs, d)
        @test σ(d, hs) ∈ hs
        @test σ(N(2.) * d, hs) ∈ hs
        d2 = N[1., 0., 0.]
        @test_throws ErrorException σ(d2, hs)
        d2 = zeros(N, 3)
        @test σ(d2, hs) ∈ hs
    end
    # tests 1
    normal = ones(N, 3)
    d = ones(N, 3)
    test_svec(HalfSpace(normal, N(5.)), d)
    # tests 2
    normal = zeros(N, 3); normal[3] = N(1.)
    d = zeros(N, 3); d[3] = 1.
    test_svec(HalfSpace(normal, N(5.)), d)

    # an_element function and membership function
    @test an_element(hs) ∈ hs
end
